import { Component, Input, OnInit } from '@angular/core';
import { DeliveryService } from '../../../../../services/delivery.service';
import { PackageService } from '../../../../../services/package.service';

@Component({
  selector: 'ngx-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  delivery: any;
  loaded = false;
  @Input() tracking = false;
  @Input() driving = false;

  constructor(
    private packageService: PackageService,
    private deliveryService: DeliveryService,
  ) { }

  ngOnInit(): void {
    console.log(' TEST ');
    console.log(this.driving);
    if(this.driving) {
      this.deliveryService.resourceSubject.subscribe(
        (result: any) => {
          this.delivery = result;  
          this.loaded = true;
        }
      );
    }

    // Case of tracking
    if(this.tracking) {
      this.deliveryService.resourceSubject.subscribe(
        (result: any) => {
          this.delivery = result;
          this.deliveryService.currentDrivingDeliveryId = result._id;  
          this.loaded = true;

          // listen to delivery update events
          this.deliveryService.delivery_updated.subscribe(
            (result: any) => {
              console.log('LISTENING TO DELIVERY UPDATE. NEW OBJECT :::');
              console.log(result);
            }
          );
        }
      );
    }

  }
}
