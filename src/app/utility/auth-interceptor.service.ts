import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { AngularTokenService } from 'angular-token';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor( private tokenService: AngularTokenService,
               private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.tokenService.getAuthDataFromStorage();

    const authData = this.tokenService.currentAuthData;

    if (authData &&
      (this.tokenService.tokenOptions.apiBase === null || req.url.match(this.tokenService.tokenOptions.apiBase))) {

      const headers = {
        'access-token': authData.accessToken,
        client:       authData.client,
        expiry:       authData.expiry,
        'token-type':   authData.tokenType,
        uid:          authData.uid
      };

      req = req.clone({
        setHeaders: headers
      });
    }

    return next.handle(req).pipe(tap(
        res => this.handleResponse(res),
        err => this.handleResponse(err)
    ));
  }


  private handleResponse(res: HttpResponse<any> | HttpErrorResponse | HttpEvent<any>): void {
    if (res instanceof HttpResponse || res instanceof HttpErrorResponse) {
      if (this.tokenService.tokenOptions.apiBase === null || (res.url && res.url.match(this.tokenService.tokenOptions.apiBase))) {
        this.tokenService.getAuthHeadersFromResponse(res);
        if (res.status == 401) {
          localStorage.clear();
          // tslint:disable-next-line
          this.tokenService['authData'] = null;
          this.router.navigate(['welcome']);
        }
      }
    }
  }
}
