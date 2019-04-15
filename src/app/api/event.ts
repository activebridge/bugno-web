import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EventAPI {

  constructor(public http: HttpClient) {}

  query(projectId) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events`);
  }

  queryByStatus(projectId, params) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events`, params);
  }

  update(projectId, id, params) {
    return this.http.patch(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events/${id}`, params);
  }

  get(projectId, id) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events/${id}`);
  }
}
