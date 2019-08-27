import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class IntegrationsAPI {

  constructor(public http: HttpClient) {}

  query(projectId) {
    return this.http.get(`${environment.apiEndpoint}/api/v1/projects/${projectId}/integrations`);
  }

  delete(projectId, id) {
    return this.http.delete(`${environment.apiEndpoint}/api/v1/projects/${projectId}/integrations/${id}`);
  }
}
