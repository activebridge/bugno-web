import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PlanAPI {
  constructor(public http: HttpClient) { }

  query() {
    return this.http.get(`${environment.apiEndpoint}/api/v1/plans`);
  }
}
