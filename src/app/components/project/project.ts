import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService, ProjectUserService, NotificationService } from '../../services';
import { ProjectAPI, ProjectUserAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html'
})

export class Project implements OnInit, OnDestroy {
  constructor(private projectAPI: ProjectAPI,
              private projectUserAPI: ProjectUserAPI,
              private projectService: ProjectService,
              private projectUserService: ProjectUserService,
              private router: ActivatedRoute,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.getProject(params.id);
        this.getProjectUsers(params.id);
      }
    });
  }

  ngOnDestroy() {
    this.projectService.project = null;
    this.projectUserService.projectUsers = null;
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe(this.onGetProjectSuccess, this.onGetError);
  }

  getProjectUsers(projectId) {
    this.projectUserAPI.query(projectId).subscribe(this.onGetProjectUsersSuccess, this.onGetError);
  }

  private onGetProjectSuccess = (resp) => {
    this.projectService.project = resp;
  }

  private onGetProjectUsersSuccess = (resp) => {
    this.projectUserService.projectUsers = resp;
  }

  private onGetError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
  }
}
