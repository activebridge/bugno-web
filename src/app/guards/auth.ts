import { Injectable } from '@angular/core';

import { BaseGuard } from './base';

@Injectable()

export class AuthGuard extends BaseGuard {

  canActivate() {
    if (this.tokenAuthService.userSignedIn()) {
      return true;
    }
    this.router.navigate(['welcome']);
    return false;
  }
}
