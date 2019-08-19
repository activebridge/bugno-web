import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-subscription-plan',
  templateUrl: './change-subscription-plan.html'
})

export class ChangeSubscriptionPlan {
  @Output() subscribe: EventEmitter<any> = new EventEmitter();
  @Input() projectId: number;
  @Input() plans: any = [];
  @Input() currentPlan = {};
  @Input() subscription: any;

  onSubscribeSuccess(subscription) {
    this.subscribe.emit(subscription);
  }
}
