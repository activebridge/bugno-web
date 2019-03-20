import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {
  signInUser:any = {};

  constructor(private tokenAuthSerivce: AngularTokenService,
              private router: Router) { }

  onSignInSubmit() {
    this.tokenAuthSerivce.signIn(this.signInUser).subscribe((res) => {
        this.router.navigate(['dashboard']);
      },
      (err) => {
        console.log('err:', err);
      }
    )
  }
}
