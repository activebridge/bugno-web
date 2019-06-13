import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.html'
})

export class Subscription implements OnInit {
  @Input() projectId: number;
  @Input() subscription: any;

  constructor() { }

  ngOnInit() { }
}
