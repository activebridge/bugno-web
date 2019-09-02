import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { AngularTokenService } from 'angular-token';

import { LocalStorageService, ActionCableService } from '../../services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})

export class Landing implements OnInit {
  registrationTokenForm: FormGroup;
  submitDisabled: false;

  constructor(private router: ActivatedRoute,
              private tokenService: AngularTokenService,
              private localStorageService: LocalStorageService,
              private actionCableService: ActionCableService,
              private redirect: Router,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSignInWithGithub() {
    this.tokenService.signInOAuth('github', { registration_token: this.registrationTokenForm.value.registrationToken })
                         .subscribe(this.onSignInSuccess);
  }

  private onSignInSuccess = () => {
    this.tokenService.validateToken().subscribe(() => {
      this.localStorageService.currentUser = this.tokenService.currentUserData;
      this.actionCableService.subscribe();
      this.redirect.navigate(['/dashboard']);
    });
  }

  initForm() {
    this.router.queryParams.subscribe(queryParams => {
      this.registrationTokenForm = this.fb.group({
        registrationToken: [queryParams.registration_token || '']
      });
    });
  }
}
