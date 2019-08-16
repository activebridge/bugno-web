import { Component } from '@angular/core';

import { EventService } from '../../../services';

@Component({
  selector: 'app-event-request-data',
  templateUrl: './event-request-data.html',
  styleUrls: ['./event-request-data.scss']
})

export class EventRequestData {
  paramsOpened = true;

  constructor(public eventService: EventService) { }

  get isParamsPresent() {
    return this.eventService.event.params || this.eventService.event.http_method
      || this.eventService.event.url || this.eventService.event.ip_address;
  }
}
