import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html'
})

export class Navbar {
  isOpen: boolean;

  constructor(public tokenAuthSerivce: AngularTokenService,
              private router: Router) { }

  signOut() {
    this.tokenAuthSerivce.signOut().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
