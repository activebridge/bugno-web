import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})

export class Navbar implements OnInit {
  isOpen: boolean;
  currentUser: any = {};

  constructor(private tokenAuthService: AngularTokenService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenAuthService.userSignedIn()) {
      this.currentUser = this.localStorageService.currentUser;
    }
  }

  signOut() {
    this.tokenAuthService.signOut().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
