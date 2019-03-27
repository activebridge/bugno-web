import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularTokenService } from 'angular-token';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html'
})

export class LoginForm implements OnInit {
  @Output() onSubmitSuccess:EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup;

  ngOnInit() {
    this.initLoginForm();
  }

  constructor(private tokenAuthSerivce: AngularTokenService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, CustomValidators.email]],
      password: ['',[ Validators.required, Validators.minLength(8)]]
    });
  }

  onSignInSubmit() {
    this.tokenAuthSerivce.signIn(this.loginForm.value).subscribe((res) => {
      this.toastr.success('Successfully logged in.');
      this.onSubmitSuccess.emit();
    }, (err) => {
      if (err.error && err.error.errors) {
        this.toastr.error(err.error.errors);
      } else {
        this.toastr.error('Whoops! Something went wrong...');
      }
    });
  }
}
