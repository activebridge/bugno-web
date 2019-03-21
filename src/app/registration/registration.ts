import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { emailPattern } from '../constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html'
})

export class Registration {
  emailPattern = emailPattern;
  signUpUser: any = {};

  constructor(private tokenAuthSerivce: AngularTokenService,
              private router: Router,
              private toastr: ToastrService) { }

  onSignUpSubmit() {
    this.tokenAuthSerivce.registerAccount(this.signUpUser).subscribe((res) => {
      this.toastr.success('Successfully registered.');
      this.router.navigate(['dashboard']);
    }, (err) => {
      if (err.error && err.error.errors) {
        err.error.errors.full_messages.forEach((message) => {
          this.toastr.error(message);
        });
      } else {
        this.toastr.error('Whoops! Something went wrong...');
      }
    });
  }
}
