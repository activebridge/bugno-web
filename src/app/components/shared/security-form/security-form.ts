import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularTokenService } from 'angular-token';

import { NotificationService } from '../../../utility/notification.service';

@Component({
  selector: 'app-security-form',
  templateUrl: './security-form.html'
})

export class SecurityForm implements OnInit {
  securityForm: FormGroup;
  submitDisabled: Boolean = false;

  constructor(private tokenAuthService: AngularTokenService,
              private fb: FormBuilder,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.initSecurityForm();
  }


  onUpdateProfileSubmit() {
    this.submitDisabled = true;
    this.tokenAuthService.updatePassword(this.securityForm.value)
                          .subscribe(this.onSecurityUpdateSuccess, this.onSecurityUpdateError);
  }
  private initSecurityForm() {
    const current_password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    const password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    const password_confirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.securityForm = this.fb.group({
      password,
      password_confirmation,
      current_password
    });
  }

  private onSecurityUpdateSuccess = (data) => {
    this.notifyService.showSuccess('Successfully updated');
    this.securityForm.reset();
    this.submitDisabled = false;
  }

  private onSecurityUpdateError = (error) => {
    this.notifyService.showError(error);
    this.submitDisabled = false;
  }
}
