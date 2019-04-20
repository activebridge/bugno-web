import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ProjectUsersAPI } from '../../api';

@Component({
  selector: 'app-project-access',
  templateUrl: './project-access.html',
})
export class ProjectAccess implements OnInit {
  projectId: any = {};
  inviteForm: FormGroup;

  constructor(private projectUsersAPI: ProjectUsersAPI,
              private router: ActivatedRoute,
              private notifyService: NotificationService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.router.parent.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id
      }
    });
  }

  onInviteSumbit() {
    this.inviteUser(this.projectId, this.inviteForm.value);
  }

  inviteUser(projectId, params) {
    this.projectUsersAPI.create(projectId, params).subscribe(this.onGetSuccess, this.onGetError);
  }

  private initForm() {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
    });
  }

  private onGetSuccess = (resp) => {
    console.log(resp)
    this.notifyService.showSuccess(resp);
  }

  private onGetError = (error) => {
    console.log(error)
    this.notifyService.showError(error);
  }
}
