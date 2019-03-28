import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectAPI {

  constructor(public http: HttpClient) {}

  query() {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects`);
  }

  create(params) {
    return this.http.post(`${environment.apiEndpoint}/api/v1/projects`, params);
  }

  update(id, params) {
    return this.http.patch(`${environment.apiEndpoint}/api/v1/projects/${id}`, params);
  }

  delete(id) {
    return this.http.delete(`${environment.apiEndpoint}/api/v1/projects/${id}`);
  }

  get(id) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${id}`);
  }
}
