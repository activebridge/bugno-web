import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { pickBy } from 'lodash';

import { LocalStorageService } from '../../../utility';
import { UserAPI } from '../../../api/user';
import { NotificationService } from '../../../utility/notification.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.html'
})

export class ProfileForm implements OnInit {
  profileForm: FormGroup;
  submitDisabled = false;

  constructor(private userAPI: UserAPI,
              private localStorageService: LocalStorageService,
              private fb: FormBuilder,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.initProfileForm();
  }

  onUpdateProfileSubmit() {
    this.submitDisabled = true;
    this.userAPI.update(pickBy(this.profileForm.value))
                         .subscribe(this.onProfileUpdateSuccess, this.onProfileUpdateError);
  }
  private initProfileForm() {
    this.profileForm = this.fb.group({
      email: [this.localStorageService.currentUser.email || '', [Validators.required, CustomValidators.email]],
      name: [this.localStorageService.currentUser.name || '', ]
    });
  }

  private onProfileUpdateSuccess = (resp) => {
    this.notifyService.showSuccess('Successfully updated');
    this.localStorageService.currentUser = resp;
    this.submitDisabled = false;
  }

  private onProfileUpdateError = (error) => {
    this.notifyService.showError(error);
    this.submitDisabled = false;
  }
}
