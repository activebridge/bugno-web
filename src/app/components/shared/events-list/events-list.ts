import { Component, OnInit, Input } from '@angular/core';
import { uniqBy, orderBy } from 'lodash';
import { NotificationService, GlobalEvents } from '../../../services';

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
              private globalEvents: GlobalEvents,
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
    return { status: this.status.key, page: this.page };
  }

  ngOnInit() {
    this.getEvents(this.projectId);
    this.globalEvents.subscribe('CREATE_EVENT', this.createEventHandle)
    this.globalEvents.subscribe('UPDATE_EVENT', this.updateEventHandle)
  }

  ngOnDestroy() {
    this.globalEvents.unsubscribe('CREATE_EVENT', this.createEventHandle)
    this.globalEvents.unsubscribe('UPDATE_EVENT', this.updateEventHandle)
  }

  createEventHandle = (event) => {
    if (event.status == this.status.key) {
      this.events.push(event);
    }
  }

  updateEventHandle = (data) => {
    if (data.status == this.status.key) {
      this.events = this.events.filter((event) => event.id != data.id);
      this.events.push(data);
      this.events = orderBy(this.events, ['position'], ['asc']);
    } else {
      this.events = this.events.filter((event) => event.id != data.id);
    }
  }

  updateEventHandler = (event: any) => {
    this.updateEvent(event.item.dataset.eventId, {status: this.status.key, position: event.newIndex + 1});
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
