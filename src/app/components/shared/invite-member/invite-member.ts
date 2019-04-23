import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../utility/notification.service';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ProjectUsersAPI } from '../../../api';

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.html',
})

export class InviteMember implements OnInit {
  @Output() invited: EventEmitter<any> = new EventEmitter();
  @Input() projectId: string;
  inviteForm: FormGroup;

  constructor(private projectUsersAPI: ProjectUsersAPI,
              private router: ActivatedRoute,
              private notifyService: NotificationService,
              private fb: FormBuilder) { }
    ngOnInit() {
      this.initForm();
    }

    onInviteSumbit() {
      this.projectUsersAPI.create(this.projectId, this.inviteForm.value).subscribe(this.onGetSuccess, this.onGetError);
    }

    private initForm() {
      this.inviteForm = this.fb.group({
        email: ['', [Validators.required, CustomValidators.email]],
      });
    }

    private onGetSuccess = (resp) => {
      this.inviteForm.reset();
      this.notifyService.showSuccess('User added');
      this.invited.emit(resp.data);
    }

    private onGetError = (error) => {
      this.notifyService.showError(error);
    }
  }