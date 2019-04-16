import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../../utility/notification.service';

import { EventAPI } from '../../../api';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.html',
})
export class EventsList implements OnInit {
  @Input() project: any = {};
  @Input() status: any;
  events: any = [];
  options: any = {};

  constructor(private eventAPI: EventAPI,
              private notifyService: NotificationService) {
    this.options = {
      group: 'normal-group',
      onUpdate: (event: any) => {
        this.updateEvent(event.item.dataset.eventId, {status: this.status.key.toLowerCase(), position: event.newIndex+1})
      },
      onAdd: (event: any) => {
        this.updateEvent(event.item.dataset.eventId, {status: this.status.key.toLowerCase(), position: event.newIndex+1})
      }
    };
  }

  getEvents(projectId, status) {
    this.eventAPI.query(projectId, status).subscribe(this.onGetEventsSuccess, this.onGetEventsError);
  }

  updateEvent(id, params) {
    this.eventAPI.update(this.project, id, {event: params}).subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  private onGetEventsSuccess = (resp) => {
    this.events = resp.data;
  }

  private onGetEventsError = (error) => {
    this.notifyService.showError(error);
  }

  private onUpdateStatusSuccess = (resp) => {
    this.notifyService.showSuccess(`Moved to ${resp.data.attributes.status}`, resp.data.attributes.title);
    // this.event.status = resp.data.attributes.status;
    console.log(resp.data.attributes)
  }
  private onUpdateStatusError = (error) => {
    this.notifyService.showError(error);
  }

  ngOnInit() {
    this.getEvents(this.project, {status: this.status.key.toLowerCase()})
  }
}
