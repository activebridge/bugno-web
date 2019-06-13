import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.html'
})

export class Subscription {
  @Input() projectId: number;
  @Input() subscription: any;

  constructor() { }
}
