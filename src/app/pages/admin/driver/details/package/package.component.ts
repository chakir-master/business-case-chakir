import { Component, Input, OnInit } from '@angular/core';
import { DeliveryService } from '../../../../../services/delivery.service';
import { PackageService } from '../../../../../services/package.service';

@Component({
  selector: 'ngx-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  package: any;
  loaded = false;
  @Input() tracking = false;
  @Input() driving = false;

  constructor(
    private packageService: PackageService,
    private deliveryService: DeliveryService,
  ) { }

  ngOnInit(): void {
    if(this.driving) {
      this.packageService.resourceSubject.subscribe(
        (result: any) => {
          this.package = result;
          let packageId = result.package_id
          // retrieve the package
          // this.packageService.getResource(packageId);
          this.loaded = true;
          console.log('Packa');
          console.log(this.package);
        }
      );     
    }

    if(this.tracking) {
      this.packageService.resourceSubject.subscribe(
        (result: any) => {
          this.package = result;

          this.loaded = true;
          console.log('Packa222');
          console.log(this.package);
        }
      );
    }

  }

}
