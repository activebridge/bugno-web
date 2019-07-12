import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SubscriptionAPI {

  constructor(public http: HttpClient) {}

  get(projectId) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/subscriptions`);
  }

  create(projectId, params) {
    return this.http.post(`${environment.apiEndpoint}/api/v1/projects/${projectId}/subscriptions`, params);
  }

  update(projectId, id, params) {
    return this.http.patch(`${environment.apiEndpoint}/api/v1/projects/${projectId}/subscriptions/${id}`, params);
  }

  cancel(projectId, id) {
    return this.http.patch(`${environment.apiEndpoint}/api/v1/projects/${projectId}/subscriptions/${id}/cancel`, {});
  }
}
