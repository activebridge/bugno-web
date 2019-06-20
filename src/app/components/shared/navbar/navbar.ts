import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

import { LocalStorageService } from '../../../utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})

export class Navbar implements OnInit {
  registration_token: string;
  isOpen: boolean;

  constructor(public tokenAuthService: AngularTokenService,
              public localStorageService: LocalStorageService,
              private redirect: Router,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(queryParams => {
      if (queryParams.registration_token) {
        this.registration_token = queryParams.registration_token;
      }
    });
  }

  onSignInWithGithub() {
    this.tokenAuthService.signInOAuth('github', this.registration_token);
  }

  signOut() {
    this.tokenAuthService.signOut().subscribe(() => {
      this.redirect.navigate(['welcome']);
      localStorage.clear();
    }, () => { localStorage.clear(); });
  }
}
