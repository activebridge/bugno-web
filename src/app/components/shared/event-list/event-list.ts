import { Component, OnInit, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { uniqBy, orderBy } from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModal } from '../confirm-modal/confirm-modal';
import { NotificationService, GlobalEvents, ProjectService, LocalStorageService, ProjectUserService } from '../../../services';

import { ACTIONS } from '../../../constants';
import { EventAPI } from '../../../api';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss']
})
export class EventList implements OnInit {
  @Input() projectId: string;
  @Input() status: any;
  isDisabled = false;
  page = 1;
  events: any = [];
  eventCount = 0;
  sortableOptions: any = {};

  constructor(public localStorageService: LocalStorageService,
              public projectUserService: ProjectUserService,
              private titleCasePipe: TitleCasePipe,
              private eventAPI: EventAPI,
              private modalService: BsModalService,
              private globalEvents: GlobalEvents,
              private projectService: ProjectService,
              private notifyService: NotificationService) {
    this.sortableOptions = {
      group: 'normal-group',
      onUpdate: this.updateEventHandler,
      onAdd: this.updateEventHandler,
      filter: '.disabled'
    };
  }

  assignCurrenUserOrUnassign(event) {
    if (event.user_id) { return this.updateEvent(event.id, { user_id: null }, null); }
    this.updateEvent(event.id, { user_id: this.localStorageService.currentUser.id }, null);
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
    this.globalEvents.subscribe(ACTIONS.CREATE_EVENT, this.createEventHandle);
    this.globalEvents.subscribe(ACTIONS.UPDATE_EVENT, this.updateEventHandle);
    this.globalEvents.subscribe(ACTIONS.DESTROY_EVENT, this.destroyEvent);
    this.globalEvents.subscribe(ACTIONS.PUSH_EVENT_BACK, this.pushEventBack);
  }

  ngOnDestroy() {
    this.globalEvents.unsubscribe(ACTIONS.CREATE_EVENT, this.createEventHandle);
    this.globalEvents.unsubscribe(ACTIONS.UPDATE_EVENT, this.updateEventHandle);
    this.globalEvents.unsubscribe(ACTIONS.DESTROY_EVENT, this.destroyEvent);
    this.globalEvents.unsubscribe(ACTIONS.PUSH_EVENT_BACK, this.pushEventBack);
  }

  pushEventBack = (data) => {
    const fromStatus = data.sortableEvent.from.id;
    const toStatus = data.sortableEvent.to.id;
    const oldIndex = data.sortableEvent.oldIndex;
    const event = data.event;

    if (this.status.key !== fromStatus) {
      if (this.status.key === toStatus) {
        this.events = this.events.filter((element) => element.id !== event.id);
      }
      this.isDisabled = false;
      return;
    }
    this.events.splice(oldIndex, 0, event);
  }

  destroyEvent = (event) => {
    this.isDisabled = true;
    if (this.isProjectEvent(event)) { this.removeEventFromList(event); }
    this.isDisabled = false;
  }

  createEventHandle = (event) => {
    this.isDisabled = true;
    if (!this.isProjectEvent(event)) { return this.isDisabled = false; }
    if (event.status === this.status.key) {
      this.events.unshift(event);
      this.updatePositionsByArrayIndex();
    }
    this.isDisabled = false;
  }

  updateEventHandle = (data) => {
    this.isDisabled = true;
    if (!this.isProjectEvent(data)) { return this.isDisabled = false; }
    if (data.status === this.status.key) {
      this.removeEventFromList(data);
      this.events.push(data);
      this.updatePositions(data);
      this.events = orderBy(this.events, ['position'], ['asc']);
    } else {
      this.removeEventFromList(data);
    }
    this.isDisabled = false;
  }

  removeEventFromList(data) {
    this.events = this.events.filter((event) => event.id !== data.id);
    this.updatePositionsByArrayIndex();
  }

  updatePositionsByArrayIndex() {
    this.events.forEach((event) => {
      const newPosition = this.events.findIndex((item) => {
        return item.id === event.id;
      });
      event.position = newPosition;
    });
  }

  updatePositions(data) {
    this.events.forEach((event) => {
      if (event.id === data.id) { return; }
      if (event.position >= data.position) { event.position += 1; }
    });
  }

  isProjectEvent(event) {
    return this.projectService.project.id === event.project_id;
  }

  updateEventHandler = (event: any) => {
    this.isDisabled = true;
    this.updateEvent(event.item.dataset.eventId, { status: this.status.key, position: event.newIndex }, event);
  }

  getEvents(projectId) {
    this.eventAPI.query(projectId, this.eventParams).subscribe(this.onGetEventsSuccess, this.onGetEventsError);
  }

  updateEvent(id, params, sortableEvent) {
    this.eventAPI.update(this.projectId, id, {event: { ...params }}).subscribe(() => {}, (error) => {
      this.onUpdateStatusError(error, sortableEvent);
    });
  }

  deleteEvent(id) {
    this.eventAPI.delete(this.projectId, id).subscribe(this.onDeleteSuccess, (error) => console.log(error));
  }

  confirmDeleteCollection() {
    if (this.events.length === 0) { return; }
    const modal = this.modalService.show(ConfirmModal, {class: 'modal-sm', backdrop: true});
    modal.content.onClose.subscribe(result => {
      if (result) { this.deleteCollection(); }
    });
  }

  deleteCollection() {
    this.eventAPI.deleteCollection(this.projectId, { status: this.status.key }).subscribe(resp => {
      this.eventCount = 0;
      this.notifyService.showSuccess(`${this.titleCasePipe.transform(this.status.key)} exceptions were successfully deleted!`);
    });
  }

  private onDeleteSuccess = (resp) => {
    this.removeEventFromList(resp);
    this.eventCount -= 1;
  }

  private onGetEventsSuccess = (resp) => {
    this.events = this.events.concat(resp.events);
    this.eventCount = resp.meta.total_count;
  }

  private onGetEventsError = (error) => {
    this.notifyService.showApiError(error);
  }

  private onUpdateStatusError = (error, sortableEvent) => {
    this.notifyService.showApiError(error);
    if (!sortableEvent) { return; }
    const event = this.events.find((element) => element.id == sortableEvent.item.dataset.eventId);
    if (!event) { return; }
    if (sortableEvent.from.id !== this.status.key) {
      this.globalEvents.publish(ACTIONS.PUSH_EVENT_BACK , { sortableEvent, event });
    } else {
      this.removeEventFromList(event);
      this.events.splice(sortableEvent.oldIndex, 0, event);
    }
    this.isDisabled = false;
  }
}
