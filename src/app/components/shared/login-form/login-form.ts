import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularTokenService } from 'angular-token';

import { NotificationService, LocalStorageService } from '../../../utility';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html'
})

export class LoginForm implements OnInit {
  @Output() onSubmitSuccess: EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup;
  submitDisabled: Boolean = false;

  constructor(private tokenAuthService: AngularTokenService,
              private localStorageService: LocalStorageService,
              private fb: FormBuilder,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.initLoginForm();
  }


  onSignInSubmit() {
    this.submitDisabled = true;
    this.tokenAuthService.signIn(this.loginForm.value)
                         .subscribe(this.onSignInSuccess, this.onSignInError);
  }

  onSignInWithGithub() {
    this.tokenAuthService.signInOAuth('github');
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, CustomValidators.email]],
      password: ['', [ Validators.required, Validators.minLength(8)]]
    });
  }

  private onSignInSuccess = (resp) => {
    this.localStorageService.currentUser = resp.body.data;
    this.notifyService.showSuccess('Successfully logged in');
    this.onSubmitSuccess.emit();
    this.submitDisabled = false;
  }

  private onSignInError = (error) => {
    this.notifyService.showError(error);
    this.submitDisabled = false;
  }
}
