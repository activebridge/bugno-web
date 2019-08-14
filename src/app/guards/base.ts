import { AngularTokenService } from 'angular-token';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LocalStorageService } from '../services';

@Injectable()

export class BaseGuard implements CanActivate {

  constructor(protected tokenAuthService: AngularTokenService,
              protected router: Router,
              protected localStorageService: LocalStorageService) {
  }

  canActivate() {
    return true;
  }
}
