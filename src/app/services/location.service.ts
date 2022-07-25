import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceActionService } from './base/resource-action.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends ResourceActionService {

  getPosition(): Observable<any> {
    return Observable.create(observer => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => observer.error(error));
    });
  }

  
}
