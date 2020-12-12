import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EventCollectionsAPI {

  constructor(public http: HttpClient) {}

  updatePosition(projectId, params) {
    return this.http.patch(`${environment.apiEndpoint}/api/v1/projects/${projectId}/event_collections`, params);
  }
}
