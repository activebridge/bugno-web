import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularTokenService } from 'angular-token';

import { NotificationService } from '../../../utility/notification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html'
})

export class LoginForm implements OnInit {
  @Output() onSubmitSuccess: EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup;
  submitDisabled: Boolean = false;

  ngOnInit() {
    this.initLoginForm();
  }

  constructor(private tokenAuthSerivce: AngularTokenService,
              private fb: FormBuilder,
              private notifyService: NotificationService) { }

  onSignInSubmit() {
    this.tokenAuthSerivce.signIn(this.loginForm.value)
                         .subscribe(this.onSignInSuccess, this.onSignInError);
  }
  private initLoginForm() {
    this.submitDisabled = true;
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, CustomValidators.email]],
      password: ['', [ Validators.required, Validators.minLength(8)]]
    });
  }

  private onSignInSuccess = (data) => {
    this.notifyService.showSuccess('Successfully logged in');
    this.onSubmitSuccess.emit();
  }

  private onSignInError = (error) => {
    this.notifyService.showError(error);
    this.submitDisabled = false;
  }
}
