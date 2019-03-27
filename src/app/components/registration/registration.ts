import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html'
})

export class Registration {
  constructor(private router: Router) { }

  onSignUpSubmit() {
      this.router.navigate(['dashboard']);
  }
}
