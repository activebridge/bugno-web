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
  page = 1;
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

  onScrollDown() {
    this.page += 1;
    this.getEvents(this.projectId);
  }

  get eventParams() {
    return { status: this.status.key.toLowerCase(), page: this.page };
  }

  ngOnInit() {
    this.getEvents(this.projectId);
  }

  updateEventHandler = (event: any) => {
    this.updateEvent(event.item.dataset.eventId, {status: this.status.key.toLowerCase(), position: event.newIndex + 1});
  }

  getEvents(projectId) {
    this.eventAPI.query(projectId, this.eventParams).subscribe(this.onGetEventsSuccess, this.onGetEventsError);
  }

  updateEvent(id, params) {
    this.eventAPI.update(this.projectId, id, {event: params}).subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  private onGetEventsSuccess = (resp) => {
    this.events = this.events.concat(resp);
  }

  private onGetEventsError = (error) => {
    this.notifyService.showError(error);
  }

  private onUpdateStatusSuccess = (resp) => {
    this.notifyService.showSuccess(`Moved to ${resp.status}`, resp.title);
  }
  private onUpdateStatusError = (error) => {
    this.notifyService.showError(error);
  }

}
