import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})

export class Landing implements OnInit {
  registrationTokenForm: FormGroup;
  submitDisabled: Boolean = false;

  constructor(private router: ActivatedRoute,
              private tokenAuthService: AngularTokenService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSignIn() {
    this.tokenAuthService.signInOAuth('github', this.registrationTokenForm.value.registrationToken);
  }

  initForm() {
    this.router.queryParams.subscribe(queryParams => {
      this.registrationTokenForm = this.fb.group({
        registrationToken: [queryParams.registration_token || '']
      });
    });
  }
}
