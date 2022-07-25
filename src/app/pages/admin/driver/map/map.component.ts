import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeliveryService } from '../../../../services/delivery.service';
import { LocationService } from '../../../../services/location.service';
import { PackageService } from '../../../../services/package.service';
import { WebSocketService } from '../../../../services/web-socket.service';

@Component({
  selector: 'ngx-map2',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() tracking = false;
  @Input() driving = false;
  showBtn = false;
  delivery: any;
  package: any;
  currentLocation: any;
  packageSourceLocation: any;
  packageDestinationLocation: any;
  browserLocationSubscription: Subscription;
  deliveryLocation: any;
  locationInterval = 20000; // 20 seconds
  nbLocationFetch = 0;
  statusOpen = false;
  statusPickedUp = false; 
  statusInTransit = false;
  statusDelivered = false;
  statusFailed = false;
  position: any;
  deliveryStatusValue: any;
  


  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: L.latLng({ lat: 6.22306885860907 , lng: 1.1789119439487463 }),
    marker: L.latLng({ lat: 6.22306885860907 , lng: 1.1789119439487463 })
  };

  constructor(
    private packageService: PackageService,
    private deliveryService: DeliveryService,
    private locationService: LocationService,
    private websocketService: WebSocketService,
  ) {
    this.websocketService.messages.subscribe(msg => {
      // this.received.push(msg);
      console.log("Response from websocket: " + msg);
    });

  }

  ngOnInit(): void {
    // console.log('From map');
    // console.log(this.driving);
    // console.log(this.tracking);

    // Init current loaction
    this.fetchLocation();

    // Fetch browser current location every x second
    const source = interval(this.locationInterval);
    this.browserLocationSubscription = source.subscribe(val => {
      this.fetchLocation();

      // Send location_update websocket event
      // if(this.deliveryStatusValue.toLowerCase() == 'in-transit') {
        if(this.delivery) {          
          this.deliveryService.location_changed.next(
            {
              delivery_id: this.delivery._id,
              location: this.currentLocation,
            }
          );
        }
      // }
    });  

    // Fetching package
    this.packageService.resourceSubject.subscribe(
      (result: any) => {
        this.package = result;        

        this.packageDestinationLocation = {
          lat : +result?.from_location.lat,
          lng: +result?.from_location.long
        };
        this.packageSourceLocation = {
          lat : +result?.to_location.lat,
          lng: +result?.to_location.long
        };
      }
    );

    // this.deliveryService.add
    this.deliveryService.resourceSubject.subscribe(
      (result: any) => {
        this.delivery = result;
        this.showBtn = true;

        // current delivery status
        this.deliveryStatusValue = this.delivery.status;

        // set current driving deliveryId
        this.deliveryService.currentDrivingDeliveryId = result._id;

        // Delivery location
        this.deliveryLocation = {
          lat: +result?.location.lat,
          lng: +result?.location.long,
        }

        // set status
        this.deliveryStatus(this.delivery.status);
      }
    );

    // Listening to update
    this.deliveryService.resourceActionResultSubject.subscribe(
      (result: any) => {
        console.log('An update of delivery have been made');
        console.log(result);
        // Listen to the event
        console.log(this.delivery);
        // reload page
      }
    );

    // listen to status change
    this.deliveryService.status_changed.subscribe(
      (result:any) => {
        this.deliveryStatus(result.status);
      }
    );
    
    // listen to location changed
    this.deliveryService.location_changed.subscribe(
      (result:any) => {
        this.deliveryLocation = result.location;
      }
    );
  }

  deliveryStatus(status) {
    switch(status.toLowerCase()) {
      case 'open' :
        this.statusOpen = true;
        break;
      case 'picked-up' :
        this.statusOpen = false;
        this.statusPickedUp = true;
        break;
      case 'in-transit' :
        this.statusPickedUp = false;
        this.statusInTransit = true;
        break;
      case 'failed' :
        this.statusInTransit = false;
        this.statusDelivered = false;
        this.statusFailed = true;
        break;
      case 'delivered' :
        this.statusInTransit = false;
        this.statusFailed = false;
        this.statusDelivered = true;
        break;
    }
  }

  fetchLocation() {
    this.nbLocationFetch++;
    this.locationService.getPosition()
    .pipe(map(result => {
        return {
          lat: result.coords.latitude,
          long: result.coords.longitude,
        }
      })  
    ) 
    .subscribe(
      (result: any) => {
        this.currentLocation = result;
        // Init map position { lat: 51.678418, lng: 7.809007 }
        this.position = {
          lat: this.currentLocation.lat, 
          lng: this.currentLocation.long
        }
      }    
    );
  }

  ngOnDestroy() {
    this.browserLocationSubscription.unsubscribe();
  }

  failed() {
    const status = 'FAILED';
    console.log('Change the status to Failed');
  }
  
  pickedUp() {}

  changeStatus(status) {
    // const status = 'PICKED-UP';
    let deliveryId = this.delivery._id;
    let packageId = this.package._id;
    if(deliveryId) {
      if(packageId) {
        // alert('Do the stuff of pick up');
        // set active deliveryId of packave
        let entity = {
          id: packageId,
          active_delivery_id : deliveryId,
        }
        this.packageService.updateResource(packageId, entity);

        // Update the delivery status
        let deliveryEntity = {
          id: deliveryId,
          status: status,
        }
        this.deliveryService.updateResource(deliveryId, deliveryEntity);
        // new object retrieve
        this.deliveryService.getResource(deliveryId);
        // Emit deliver_update
        this.deliveryService.delivery_updated.next(
          {
            delivery_object: this.delivery
          }
        );

        // Emit status_changed event
        this.deliveryService.status_changed.next(
          {
            delivery_id: deliveryId,
            status: status,
          }
        );
          
        //Handle event, send event status changed
        let message = {
          source: '',
          content: {},
        };
        message.source = 'localhost';
        message.content = {
          delivery_id: deliveryId,
          status: status,
        };

        this.websocketService.messages.next(message);

      } else {
        alert('Package infos not found.');
      }

    } else {
      alert('Delivery infos not found.');
    }

  }

  reInitStatus() {

  }
  
}
