import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})

export class Navbar {
  isOpen: boolean;
  currentUser: any = {};

  constructor(public tokenAuthService: AngularTokenService,
              public localStorageService: LocalStorageService,
              private router: Router) { }

  signOut() {
    this.tokenAuthService.signOut().subscribe(() => {
      this.router.navigate(['login']);
      localStorage.clear();
    }, () => { localStorage.clear(); });
  }
}
