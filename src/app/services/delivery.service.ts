import { Injectable } from '@angular/core';
import { ResourceActionService } from './base/resource-action.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends ResourceActionService {
  url='/delivery';
  currentDrivingDeliveryId: any;
  currentTrackingDeliveryId: any;
}
