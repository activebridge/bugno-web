import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-event-item',
  templateUrl: './activity-event-item.html'
})

export class ActivityEventItem {
  @Input() item: any = {};
}
