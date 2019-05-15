import { AngularTokenService } from 'angular-token';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class BaseGuard implements CanActivate {

  constructor(protected tokenAuthService: AngularTokenService,
              protected router: Router) {
  }

  canActivate() {
    return true;
  }
}
