import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})

export class Navbar implements OnInit {
  isOpen: boolean;
  currentUser: any = {};

  constructor(public tokenAuthService: AngularTokenService,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenAuthService.userSignedIn()) {
      this.tokenAuthService.validateToken().subscribe(res => {
        this.currentUser = res.data;
      });
    }
  }

  signOut() {
    this.tokenAuthService.signOut().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
