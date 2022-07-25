import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url: string;

  constructor(public http: HttpClient) {
  }

  getAll(params = {}): Observable<any> {
    console.log(environment.backendUrl + '/api' + this.url);
    return this.http.get(environment.backendUrl + '/api' + this.url, {params: params});
  }

  add(entity): Observable<any> {
    return this.http.post(environment.backendUrl + '/api' + this.url, entity);
  }
  get(id): Observable<any> {
    return this.http.get(environment.backendUrl + '/api' + this.url + `/${id}`);
  }
  update(id, entity): Observable<any> {
    return this.http.put(environment.backendUrl + '/api' + this.url + `/${id}`, entity);
  }

  delete(id): Observable<any> {
    return this.http.delete(environment.backendUrl + '/api' + this.url + `/${id}`);
  }

  addAll(list): Observable<any> {
    return this.http.post(environment.backendUrl + '/api' + this.url + '/addAll', list);
  }

}
