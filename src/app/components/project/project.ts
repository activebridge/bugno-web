import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubscriptionStatus } from '../../enums';
import { EVENT_LIMIT_ALERT } from '../../constants';
import { ProjectService, ProjectUserService, NotificationService } from '../../services';
import { ProjectAPI, ProjectUserAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})

export class Project implements OnInit, OnDestroy {
  subscriptionAlert = false;
  subscriptionExpiresSoon: boolean;
  subscriptionExpired: boolean;
  subscriptionStatuses = SubscriptionStatus;
  project: any = {};
  loading: boolean;
  projectId: number;
  tabs: any = [
    {title: 'Events', url: 'events'},
    {title: 'Access', url: 'access'},
    {title: 'Settings', url: 'settings'},
    {title: 'Subscriptions', url: 'subscriptions'},
    {title: 'Integrations', url: 'integrations'}
  ];

  constructor(private projectAPI: ProjectAPI,
              private projectUserAPI: ProjectUserAPI,
              private projectService: ProjectService,
              private projectUserService: ProjectUserService,
              private router: ActivatedRoute,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.loading = true;
    this.router.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getProject();
        this.getProjectUsers();
      }
    });
  }

  ngOnDestroy() {
    this.projectService.project = null;
  }

  getProject() {
    this.projectAPI.get(this.projectId).subscribe(this.onGetProjectSuccess, this.onGetError);
  }

  getProjectUsers() {
    this.projectUserAPI.query(this.projectId).subscribe(this.onGetProjectUsersSuccess, this.onGetError);
  }

  checkSubscriptionState() {
    if (this.project.subscription) {
      this.subscriptionExpiresSoon = this.project.subscription.events <= EVENT_LIMIT_ALERT &&
        this.project.subscription.status === this.subscriptionStatuses.active;
      this.subscriptionExpired = this.project.subscription.status === this.subscriptionStatuses.expired;
    }
    this.subscriptionAlert = !this.project.subscription || this.subscriptionExpiresSoon || this.subscriptionExpired;
  }

  private onGetProjectSuccess = (resp) => {
    this.project = resp;
    this.projectService.project = resp;
    this.checkSubscriptionState();
  }

  private onGetProjectUsersSuccess = (resp) => {
    this.projectUserService.projectUsers = resp;
  }

  private onGetError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
  }
}
