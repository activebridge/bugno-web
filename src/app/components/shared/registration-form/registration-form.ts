import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularTokenService } from 'angular-token';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.html'
})

export class RegistrationForm implements OnInit {
  @Output() onSubmitSuccess: EventEmitter<any> = new EventEmitter();
  registrationForm: FormGroup;
  submitDisabled: Boolean = false;

  ngOnInit() {
    this.initRegistrationForm();
  }

  constructor(private tokenAuthSerivce: AngularTokenService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  onSignUpSubmit() {
    this.submitDisabled = true;
    this.tokenAuthSerivce.registerAccount(this.registrationForm.value)
                         .subscribe(this.onCreateSuccess, this.onCreateError);
  }

  private onCreateSuccess = (resp) => {
    this.toastr.success('Successfully registered.');
    this.onSubmitSuccess.emit();
  }

  private onCreateError = (error) => {
    if (error.error && error.error.errors) {
      error.error.errors.full_messages.forEach((message) => {
        this.toastr.error(message);
      });
    } else {
      this.toastr.error('Whoops! Something went wrong...');
    }
    this.submitDisabled = false;
  }

  private initRegistrationForm() {
    const password = new FormControl('', [ Validators.required, Validators.minLength(8)]);
    const passwordConfirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.registrationForm = this.fb.group({
      login: ['', [Validators.required, CustomValidators.email]],
      name: [''],
      password,
      passwordConfirmation
    });
  }

}
