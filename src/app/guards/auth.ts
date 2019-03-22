import { Injectable } from '@angular/core';

import { BaseGuard } from './base';

@Injectable()

export class AuthGuard extends BaseGuard {

  canActivate() {
    if (this.tokenAuthSerivce.userSignedIn()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
