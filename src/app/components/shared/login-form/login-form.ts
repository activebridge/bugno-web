import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html'
})

export class LoginForm implements OnInit {
  registration_token: string;
  constructor(private tokenAuthService: AngularTokenService,
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
}
