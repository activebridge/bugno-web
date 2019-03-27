import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})

export class Login {
  constructor(private router: Router) { }

  onSignInSubmit() {
    this.router.navigate(['dashboard']);
  }
}
