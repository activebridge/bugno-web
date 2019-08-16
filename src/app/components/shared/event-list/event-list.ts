import { Component, OnInit, Input } from '@angular/core';
import { uniqBy, orderBy } from 'lodash';
import { NotificationService, GlobalEvents, ProjectService } from '../../../services';

import { EVENTS } from '../../../constants';
import { EventAPI } from '../../../api';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss']
})
export class EventList implements OnInit {
  @Input() projectId: any = {};
  @Input() status: any;
  page = 1;
  events: any = [];
  eventCount = 0;
  sortableOptions: any = {};

  constructor(private eventAPI: EventAPI,
              private globalEvents: GlobalEvents,
              private projectService: ProjectService,
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
    this.globalEvents.subscribe(EVENTS.CREATE_EVENT, this.createEventHandle);
    this.globalEvents.subscribe(EVENTS.UPDATE_EVENT, this.updateEventHandle);
  }

  ngOnDestroy() {
    this.globalEvents.unsubscribe(EVENTS.CREATE_EVENT, this.createEventHandle);
    this.globalEvents.unsubscribe(EVENTS.UPDATE_EVENT, this.updateEventHandle);
  }

  createEventHandle = (event) => {
    if (!this.isProjectEvent(event)) { return; }
    if (event.status == this.status.key) {
      this.events.push(event);
    }
  }

  updateEventHandle = (data) => {
    if (!this.isProjectEvent(data)) { return; }
    if (data.status == this.status.key) {
      this.prepareEventList(data);
      this.events.push(data);
      this.updatePositions(data);
      this.events = orderBy(this.events, ['position'], ['asc']);
    } else {
      this.prepareEventList(data);
    }
  }

  prepareEventList(data) {
    this.events = this.events.filter((event) => event.id != data.id);
    this.updatePositionsByIndex();
  }

  updatePositionsByIndex() {
    this.events.forEach((event) => {
      const newPosition = this.events.findIndex((item) => {
        return item.id == event.id;
      });
      event.position = newPosition + 1;
    });
  }

  updatePositions(data) {
    this.events.forEach((event) => {
      if (event.id == data.id) { return; }
      if (event.position >= data.position) {
        event.position += 1;
      }
    });
  }

  isProjectEvent(event) {
    return this.projectService.project.id == event.project_id;
  }

  updateEventHandler = (event: any) => {
    this.updateEvent(event.item.dataset.eventId, {status: this.status.key, position: event.newIndex + 1});
  }

  getEvents(projectId) {
    this.eventAPI.query(projectId, this.eventParams).subscribe(this.onGetEventsSuccess, this.onGetEventsError);
  }

  updateEvent(id, params) {
    this.eventAPI.update(this.projectId, id, {event: params}).subscribe(() => {}, this.onUpdateStatusError);
  }

  private onGetEventsSuccess = (resp) => {
    this.events = this.events.concat(resp.events);
    this.eventCount = resp.total_count;
  }

  private onGetEventsError = (error) => {
    this.notifyService.showApiError(error);
  }

  private onUpdateStatusError = (error) => {
    this.notifyService.showApiError(error);
  }

}
