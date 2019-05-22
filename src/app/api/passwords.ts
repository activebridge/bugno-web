import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PasswordsAPI {

  constructor(public http: HttpClient) {}

  update(params, headers) {
    return this.http.put(`${environment.apiEndpoint}/auth/password`, params, headers);
  }
}
