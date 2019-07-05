import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';

import { ProjectAPI, EventAPI } from '../../api';
import { EVENT_LIMIT_ALERT } from '../../constants';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})

export class Project implements OnInit {
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

  isSubscriptionAlert() {
    return !this.isSubscriptionPresent() || this.isSubscriptionExpired() || this.isSubscriptionExpireSoon();
  }

  isSubscriptionExpireSoon() {
    if (this.project.subscription) {
      return this.project.subscription.events <= EVENT_LIMIT_ALERT && this.project.subscription.status == 'active';
    }
  }

  isSubscriptionExpired() {
    if (this.project.subscription) {
      return this.project.subscription.status == 'expired';
    }
  }

  isSubscriptionPresent() {
    return this.project.subscription;
  }

  private onGetSuccess = (resp) => {
    this.project = resp;
    this.loading = false;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }
}
