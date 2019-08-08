import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SubscriptionAPI, ProjectAPI } from '../../../api';
import { NotificationService } from '../../../services';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.html',
  styleUrls: ['./subscription.scss']
})

export class Subscription {
  @Input() loading: true;
  @Output() changePlan: EventEmitter<any> = new EventEmitter();
  @Output() onCancelSubscription: EventEmitter<any> = new EventEmitter();
  @Input() projectId: number;
  @Input() subscription: any;

  constructor(private subscriptionAPI: SubscriptionAPI,
              private notificationService: NotificationService) { }

  triggerChangePlan() {
    this.changePlan.emit();
  }

  cancelSubscription() {
    this.subscriptionAPI.cancel(this.projectId, this.subscription.id).subscribe((resp) => {
      this.notificationService.showSuccess('Card successfully detached');
      this.subscription = resp;
      this.onCancelSubscription.emit(resp);
    }, (error) => {
      this.notificationService.showApiError(error);
    });
  }
}
