import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';

import { ProjectUserAPI } from '../../api';

@Component({
  selector: 'app-project-access',
  templateUrl: './project-access.html',
})

export class ProjectAccess implements OnInit {
  projectUsers: any = [];
  projectId: string;

  constructor(private projectUserAPI: ProjectUserAPI,
              private router: ActivatedRoute,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.parent.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getProjectUsers(this.projectId);
      }
    });
  }

  onInviteSuccess(projectUser) {
    this.projectUsers.push(projectUser);
  }

  getProjectUsers(projectId) {
    this.projectUserAPI.query(projectId).subscribe(this.onGetSuccess, this.onGetError);
  }

  private onGetSuccess = (resp) => {
    this.projectUsers = resp;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
  }
}
