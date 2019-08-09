import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ActivityAPI {
  constructor(public http: HttpClient) { }

  query(params = {}) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/activities`, { params });
  }
}
