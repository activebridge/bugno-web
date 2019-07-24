import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

import { LocalStorageService, ActionCableService } from '../../services';

@Component({
  template: ''
})

export class OAuthCallback implements OnInit {
  constructor(private tokenService: AngularTokenService,
              private localStorageService: LocalStorageService,
              private actionCableService: ActionCableService,
              private router: Router) { }

  ngOnInit() {
    this.tokenService.processOAuthCallback();
    this.tokenService.validateToken().subscribe(() => {
      this.localStorageService.currentUser = this.tokenService.currentUserData;
      this.actionCableService.subscribe();
      this.router.navigate(['/dashboard']);
    });
  }
}
