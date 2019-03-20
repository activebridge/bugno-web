import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {
  signInUser:any = {};
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private tokenAuthSerivce: AngularTokenService,
              private router: Router,
              private toastr: ToastrService) { }

  onSignInSubmit() {
    console.log(this.signInUser)
    this.tokenAuthSerivce.signIn(this.signInUser).subscribe((res) => {
        this.toastr.success('Successfully logged in.');
        this.router.navigate(['dashboard']);
      },
      (err) => {
        if (err.error && err.error.errors) {
          this.toastr.error(err.error.errors)
        } else {
          this.toastr.error('Whoops! Something went wrong...')
        };
      }
    )
  }
}
