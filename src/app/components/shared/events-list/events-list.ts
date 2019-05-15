import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../../utility/notification.service';

import { EventAPI } from '../../../api';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.html',
  styleUrls: ['./events-list.scss']
})
export class EventsList implements OnInit {
  @Input() projectId: any = {};
  @Input() status: any;
  events: any = [];
  sortableOptions: any = {};

  constructor(private eventAPI: EventAPI,
              private notifyService: NotificationService) {
    this.sortableOptions = {
      group: 'normal-group',
      onUpdate: this.updateEventHandler,
      onAdd: this.updateEventHandler
    };
  }

  ngOnInit() {
    this.getEvents(this.projectId, {status: this.status.key.toLowerCase()});
  }

  updateEventHandler = (event: any) => {
    this.updateEvent(event.item.dataset.eventId, {status: this.status.key.toLowerCase(), position: event.newIndex + 1});
  }

  getEvents(projectId, status) {
    this.eventAPI.query(projectId, status).subscribe(this.onGetEventsSuccess, this.onGetEventsError);
  }

  updateEvent(id, params) {
    this.eventAPI.update(this.projectId, id, {event: params}).subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  private onGetEventsSuccess = (resp) => {
    this.events = resp.data;
  }

  private onGetEventsError = (error) => {
    this.notifyService.showError(error);
  }

  private onUpdateStatusSuccess = (resp) => {
    this.notifyService.showSuccess(`Moved to ${resp.data.attributes.status}`, resp.data.attributes.title);
  }
  private onUpdateStatusError = (error) => {
    this.notifyService.showError(error);
  }

}
