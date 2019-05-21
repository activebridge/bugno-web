import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularTokenService } from 'angular-token';
import { ActivatedRoute , Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { NotificationService } from '../../../utility/notification.service';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.html'
})

export class NewPasswordForm implements OnInit {
  httpOptions = { headers: {} };
  newPasswordForm: FormGroup;
  submitDisabled: Boolean = false;

  constructor(private tokenAuthService: AngularTokenService,
              private fb: FormBuilder,
              private redirect: Router,
              private http: HttpClient,
              private router: ActivatedRoute,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.queryParams.subscribe(queryParams => {
      this.httpOptions.headers = new HttpHeaders(queryParams);
    });
    this.tokenAuthService['authData'] = null;
    this.initNewPasswordForm();
  }

  onNewPasswordSubmit() {
    this.submitDisabled = true;
    this.http.put(`${environment.apiEndpoint}/auth/password`, this.newPasswordForm.value, this.httpOptions)
             .subscribe(this.onNewPasswordSuccess, this.onNewPasswordError);
  }

  private initNewPasswordForm() {
    const password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    const password_confirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.newPasswordForm = this.fb.group({
      password,
      password_confirmation,
    });
  }

  private onNewPasswordSuccess = (data) => {
    this.notifyService.showSuccess('Success');
    this.tokenAuthService['authData'] = null;
    this.redirect.navigate(['login']);
    this.submitDisabled = false;
  }

  private onNewPasswordError = (error) => {
    this.notifyService.showError(error);
    this.tokenAuthService['authData'] = null;
    this.submitDisabled = false;
  }
}
