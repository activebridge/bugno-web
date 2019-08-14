import { Injectable } from '@angular/core';

import { BaseGuard } from './base';

@Injectable()

export class AuthGuard extends BaseGuard {

  canActivate() {
    if (this.tokenAuthService.userSignedIn() && this.localStorageService.currentUser) {
      return true;
    } else {
      this.router.navigate(['landing']);
      localStorage.removeItem('currentUser');
      return false;
    }
  }
}
