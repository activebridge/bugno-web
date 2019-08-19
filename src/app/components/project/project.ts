import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, ProjectService } from '../../services';

import { SubscriptionStatus } from '../../enums';
import { ProjectAPI, EventAPI } from '../../api';
import { EVENT_LIMIT_ALERT } from '../../constants';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})

export class Project implements OnInit {
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
    {title: 'Subscriptions', url: 'subscriptions'}
  ];

  constructor(private projectAPI: ProjectAPI,
              private eventAPI: EventAPI,
              private router: ActivatedRoute,
              private redirect: Router,
              private projectService: ProjectService,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.loading = true;
    this.router.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getProject();
      }
    });
  }

  getProject() {
    this.projectAPI.get(this.projectId).subscribe(this.onGetSuccess, this.onGetError);
  }

  checkSubscriptionState() {
    if (this.project.subscription) {
      this.subscriptionExpiresSoon = this.project.subscription.events <= EVENT_LIMIT_ALERT &&
        this.project.subscription.status === this.subscriptionStatuses.active;
      this.subscriptionExpired = this.project.subscription.status === this.subscriptionStatuses.expired;
    }
    this.subscriptionAlert = !this.project.subscription || this.subscriptionExpiresSoon || this.subscriptionExpired;
  }

  private onGetSuccess = (resp) => {
    this.project = resp;
    this.projectService.project = resp;
    this.checkSubscriptionState();
  }

  private onGetError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
  }
}
