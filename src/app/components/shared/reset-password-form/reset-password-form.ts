import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { AngularTokenService } from 'angular-token';
import { CustomValidators } from 'ng2-validation';

import { NotificationService } from '../../../utility/notification.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.html'
})

export class ResetPasswordForm implements OnInit {
  resetPasswordForm: FormGroup;
  submitDisabled: Boolean = false;

  constructor(private tokenAuthService: AngularTokenService,
              private fb: FormBuilder,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.initResetPasswordForm();
  }

  onResetPasswordSubmit() {
    this.submitDisabled = true;
    this.tokenAuthService.resetPassword(this.resetPasswordForm.value)
                         .subscribe(this.onResetPasswordSuccess, this.onResetPasswordError);
  }

  private initResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      login: ['', [Validators.required, CustomValidators.email]],
    });
  }

  private onResetPasswordSuccess = (data) => {
    // tslint:disable-next-line
    this.tokenAuthService['authData'] = null;
    this.notifyService.showSuccess('Success');
    this.submitDisabled = false;
  }

  private onResetPasswordError = (error) => {
    // tslint:disable-next-line
    this.tokenAuthService['authData'] = null;
    this.notifyService.showError(error);
    this.submitDisabled = false;
  }
}
