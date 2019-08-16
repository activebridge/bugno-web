import { Component } from '@angular/core';

import { EventService } from '../../../services';

@Component({
  selector: 'app-event-trace',
  templateUrl: './event-trace.html',
  styleUrls: ['./event-trace.scss']
})

export class EventTrace {
  event: any = {};

  constructor(public eventService: EventService) { }
}
