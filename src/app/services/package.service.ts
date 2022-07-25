import { Injectable } from '@angular/core';
import { ResourceActionService } from './base/resource-action.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends ResourceActionService {
  url='/package';
  currentDrivingPackageId: any;
  currentTrackindPackageId: any;

  
}
