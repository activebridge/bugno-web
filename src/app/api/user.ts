import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserAPI {

  constructor(public http: HttpClient) {}

  update(params) {
    return this.http.put(`${environment.apiEndpoint}/api/`, params);
  }
}
