import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DeliveryService } from '../../../services/delivery.service';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backendUrl = environment.backendUrl;

  constructor(
    private packageService: PackageService,
    private deliveryService: DeliveryService,
  ) { }

  ngOnInit(): void {
  }

}
