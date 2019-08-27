import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

import { LocalStorageService, ActionCableService } from '../../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})

export class Navbar implements OnInit {
  registrationToken: string;
  isOpen: boolean;

  constructor(public tokenService: AngularTokenService,
              public localStorageService: LocalStorageService,
              private actionCableService: ActionCableService,
              private redirect: Router,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(queryParams => {
      if (queryParams.registration_token) {
        this.registrationToken = queryParams.registration_token;
      }
    });
  }

  onSignInWithGithub() {
    this.tokenService.signInOAuth('github', { registration_token: this.registrationToken })
                         .subscribe(this.onSignInSuccess);
  }


  signOut() {
    this.tokenService.signOut().subscribe(this.onSignOutSuccess);
  }

  private onSignInSuccess = () => {
    this.tokenService.validateToken().subscribe(() => {
      this.localStorageService.currentUser = this.tokenService.currentUserData;
      this.actionCableService.subscribe();
      this.redirect.navigate(['/dashboard']);
    });
  }

  private onSignOutSuccess = () => {
    this.redirect.navigate(['landing']);
    localStorage.removeItem('currentUser');
    this.actionCableService.unsubscribe();
  }
}
