import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceActionService extends CrudService{
  resourceEditType: string = '';
  resourcesSubject = new Subject<any[]>();
  resources: any[] = [];
  resourceSubject = new Subject<any>();
  status_changed = new Subject<any>();
  location_changed = new Subject<any>();
  delivery_updated = new Subject<any>();
  resource: any;
  resourceActionResultSubject = new Subject<any>();
  resourceActionResult: any = {
   /*
    type: '',
    message: 'success',
    */
  };
  currentResourceSubject = new Subject<any>();
  currentResource: any = {};
  constructor(
    public http: HttpClient,
    //  private authenticationService: AuthenticationService,
  ) {
    super(http);
  }
  emitResourceActionResult() {
    this.resourceActionResultSubject.next(this.resourceActionResult);
  }
  emitResourcesSubject() {
    this.resourcesSubject.next(this.resources.slice());
  }
  getResources(params = {}) {
    console.log('params', params);
    /*
    const agency = this.authenticationService.getLocalStorageItem('agency');
    if (agency) {
      params['agency_id'] = agency.id;
    }
    */
    this.getAll(params).subscribe(
      (result: any) => {
        this.resources = result?.data;
        if(Array.isArray(result.data)) {
          this.resources = result.data;
        }
        this.emitResourcesSubject();
      },
    );
  }

  getSimpleResources(params = {}) {
    return this.getAll(params);
  }

  emitResourceSubject() {
    this.resourceSubject.next(this.resource);
  }
  getResource(id) {
    this.get(id).subscribe(
      (result: any) => {
        this.resource = result;
        if(Array.isArray(result)) {
          this.resource = result;
        }
        // console.log(this.resource);
        this.emitResourceSubject();
      },
    );
  }

  addResource(resource: any) {
    console.log('resource serv', resource);
    this.resourceActionResult = {
      type: 'add',
      message: 'success',
      data: {},
    };
    this.add(resource).subscribe(
      (resourceResult: any) => {
        //  this.resourceResults.unshift(resourceResult);
        //  this.emitResourcesSubject();
        this.resourceActionResult.data = resourceResult;
        this.emitResourceActionResult();

      },
      (error) => {
        this.resourceActionResult.message = 'failure';
        console.log('error', error);
        this.emitResourceActionResult();
      },
    );
  }
  
  updateResource(id: number, resource: any) {
    this.update(id, resource).subscribe(
      (resourceResponse: any) => {
        let index;
        //  this.getResource(id);
        if (this.resources?.length > 0) {
            index = this.resources.findIndex(
            (item: any, i) => {
              return item.id == id;
            },
          );
          console.log('index=' + index);
          this.resources[index] = resourceResponse;
        }
        this.resourceActionResult = {
          type: 'update',
          message: 'success',
        };
        this.emitResourceActionResult();
      },
    );
  }

  deleteResource(id) {
    console.log('service delete ministere');
    this.resourceActionResult = {
      type: 'delete',
      message: 'success',
    };
    this.delete(id).subscribe(
      (resource: any) => {
        this.getResources();
        this.emitResourceActionResult();
      },
      (error) => {
        this.resourceActionResult.message = 'failure';
        console.log('error');
        this.emitResourceActionResult();
      },
    );
  }
  uploadResourceImport(input) {
    this.resourceActionResult = {
      type: 'import',
      message: 'success',
    };
    this.addAll(input).subscribe(
      (resource: any) => {
        this.getResources();
        this.emitResourceActionResult();
      },
      (error) => {
        this.resourceActionResult.message = 'failure';
        this.emitResourceActionResult();

        console.log('error');
      },
    );
  }
}
