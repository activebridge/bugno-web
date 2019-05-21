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
  currentUser: any = {};
  profileForm: FormGroup;
  submitDisabled: Boolean = false;

  constructor(private userAPI: UserAPI,
              private localStorageService: LocalStorageService,
              private fb: FormBuilder,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.currentUser = this.localStorageService.currentUser;
    this.initProfileForm();
  }

  onUpdateProfileSubmit() {
    this.submitDisabled = true;
    this.userAPI.update(pickBy(this.profileForm.value))
                         .subscribe(this.onProfileUpdateSuccess, this.onProfileUpdateError);
  }
  private initProfileForm() {
    this.profileForm = this.fb.group({
      email: [this.currentUser.email || '', [Validators.required, CustomValidators.email]],
      name: [this.currentUser.name || '', ]
    });
  }

  private onProfileUpdateSuccess = (resp) => {
    this.notifyService.showSuccess('Successfully updated');
    this.localStorageService.currentUser = resp.data;
    this.submitDisabled = false;
  }

  private onProfileUpdateError = (error) => {
    this.notifyService.showError(error);
    this.submitDisabled = false;
  }
}
