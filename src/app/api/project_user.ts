import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectUserAPI {

  constructor(public http: HttpClient) {}

  query(projectId) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/project_users`);
  }

  create(projectId, params) {
    return this.http.post(`${environment.apiEndpoint}/api/v1/projects/${projectId}/project_users`, params);
  }

  delete(projectId, id) {
    return this.http.delete(`${environment.apiEndpoint}/api/v1/projects/${projectId}/project_users/${id}`);
  }
}
