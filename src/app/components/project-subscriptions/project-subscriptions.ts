import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlanAPI, SubscriptionAPI } from '../../api';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-project-subscriptions',
  templateUrl: './project-subscriptions.html'
})

export class ProjectSubscriptions implements OnInit {
  changePlan = false;
  projectId: number;
  plans: any = [];
  subscription: any = {};
  loading: boolean;

  constructor(private subscriptionAPI: SubscriptionAPI,
              private planAPI: PlanAPI,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.parent.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getSubscription();
      }
    });
    this.getPlans();
  }

  onSubscribeSuccess(subscription) {
    this.subscription = subscription;
    this.changePlan = false;
  }

  private getSubscription() {
    this.loading = true;
    this.subscriptionAPI.get(this.projectId).subscribe((resp) => {
      this.subscription = resp;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
  private getPlans() {
    this.planAPI.query().subscribe((resp) => {
      this.plans = resp;
    });
  }
}
