import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SubscriptionAPI {

  constructor(public http: HttpClient) {}

  query(projectId) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/subscriptions`);
  }

  create(projectId, params) {
    return this.http.post(`${environment.apiEndpoint}/api/v1/projects/${projectId}/subscriptions`, params);
  }
}
