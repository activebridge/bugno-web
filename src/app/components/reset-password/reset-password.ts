import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html'
})

export class ResetPassword implements OnInit {
  hasToken: Boolean;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(queryParams => {
      this.hasToken = queryParams.hasOwnProperty('token');
    });
  }
}
