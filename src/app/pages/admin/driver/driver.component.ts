import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DeliveryService } from '../../../services/delivery.service';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'ngx-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  deliveryId: any;
  data: any = [];
  delivery: any;
  package: any;


  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
  }

  loadDelivery(deliveryInput: HTMLInputElement) {
    this.deliveryId = deliveryInput.value;
    if(this.deliveryId) {
      console.log('Processing..');

      // Fetch delivery
      this.deliveryService.get(this.deliveryId)
      .subscribe(
        (result: any) => {
          this.delivery = result.data;
          let packageId = result.package_id
          // emit
          this.deliveryService.resource = result;
          this.deliveryService.emitResourceSubject();
          // retrieve the package
          this.packageService.getResource(packageId);
        },
      );
    } else {
      alert('No delivery ID given.');      
    }
  }

  logData() {
    console.log(this.delivery);
    console.log(this.package);

  }


}
