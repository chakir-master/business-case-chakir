import { Component, Input, OnInit } from '@angular/core';
import { DeliveryService } from '../../../services/delivery.service';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'ngx-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  packageId: any;
  package: any;
  activeDeliveryId: string;

  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,

  ) { }

  ngOnInit(): void {

  }

  loadActiveDelivery(packageInput: HTMLInputElement) {
    this.packageId = packageInput.value
    if(this.packageId) {
      console.log('Processing');
      // Fetch package and emit
      this.packageService.get(this.packageId)
      .subscribe(
        (result: any) => {
          // Emit package subject
          this.packageService.resource = result;
          this.packageService.emitResourceSubject();

          this.activeDeliveryId = result.active_delivery_id;

          if(this.activeDeliveryId) {
            // Get and emit delivery
            this.deliveryService.getResource(this.activeDeliveryId);
          }
        },
      );
    } else {
      alert('No package ID given');
    }
  }

}
