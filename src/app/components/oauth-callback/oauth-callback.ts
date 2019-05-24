import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

import { LocalStorageService } from '../../utility';

@Component({
  template: ''
})

export class OAuthCallback implements OnInit {
  constructor(private tokenService: AngularTokenService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.tokenService.processOAuthCallback();
    this.tokenService.validateToken().subscribe(() => {
      this.localStorageService.currentUser = this.tokenService.currentUserData;
      this.router.navigate(['/dashboard']);
    });
  }
}
