import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.html'
})

export class AddSubscription {
  @Output() subscribe: EventEmitter<any> = new EventEmitter();
  @Input() projectId: number;
  @Input() plans: any = [];

  onSubscribeSuccess(subscription) {
    this.subscribe.emit(subscription);
  }
}
