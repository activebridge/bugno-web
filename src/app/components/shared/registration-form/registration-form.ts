import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularTokenService } from 'angular-token';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.html'
})

export class RegistrationForm implements OnInit {
  @Output() onSubmitSuccess:EventEmitter<any> = new EventEmitter();
  registrationForm: FormGroup;

  ngOnInit() {
    this.initRegistrationForm();
  }

  constructor(private tokenAuthSerivce: AngularTokenService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  private initRegistrationForm() {
    const password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    const passwordConfirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.registrationForm = this.fb.group({
      login: ['', [Validators.required, CustomValidators.email]],
      name: [''],
      password: password,
      passwordConfirmation: passwordConfirmation
    });
  }

  onSignUpSubmit() {
    this.tokenAuthSerivce.registerAccount(this.registrationForm.value).subscribe((res) => {
      this.toastr.success('Successfully registered.');
      this.onSubmitSuccess.emit()
    }, (err) => {
      if (err.error && err.error.errors) {
        err.error.errors.full_messages.forEach((message) => {
          this.toastr.error(message);
        });
      } else {
        this.toastr.error('Whoops! Something went wrong...');
      }
    });
  }
}
