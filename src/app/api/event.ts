import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EventAPI {

  constructor(public http: HttpClient) {}

  query(projectId, params = {}) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events`, { params });
  }

  getOccurrences(projectId, parentId, params = {}) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events/occurrences/${parentId}`, { params });
  }

  update(projectId, id, params) {
    return this.http.patch(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events/${id}`, params);
  }

  get(projectId, id) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events/${id}`);
  }

  delete(projectId, id) {
    return this.http.delete(`${environment.apiEndpoint}/api/v1/projects/${projectId}/events/${id}`);
  }
}
