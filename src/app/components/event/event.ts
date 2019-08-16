import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pickBy, isNumber } from 'lodash';

import { EventService, OccurrencesService, NotificationService } from '../../services';
import { EventStatus } from '../../enums';
import { EventAPI } from '../../api';

@Component({
  selector: 'app-event',
  templateUrl: './event.html'
})
export class Event implements OnInit {
  event: any = {};
  statuses = pickBy(EventStatus, isNumber);
  projectId: number;
  tabs: any = [
    {title: 'Trace', url: 'trace'},
    {title: 'Data', url: 'request-data'},
    {title: 'Occurrences', url: 'occurrences'},
  ];

  constructor(public occurrencesService: OccurrencesService,
              private eventService: EventService,
              private notifyService: NotificationService,
              private eventAPI: EventAPI,
              private router: ActivatedRoute,
              private redirect: Router) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id && params.projectId) {
        this.projectId = params.projectId;
        this.getEvent(params.projectId, params.id);
      }
    });
  }

  get parentId() {
    return this.event.parent_id || this.event.id;
  }

  updateEventStatus(status) {
    this.eventAPI.update(this.event.project_id, this.event.id, this.eventParams(status))
        .subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  getOccurrences() {
    this.occurrencesService.occurrencesByDate = null;
    this.occurrencesService.occurrenceTotalCount = 0;
    this.occurrencesService.occurrencesLoading = true;
    this.eventAPI.getOccurrences(this.event.project_id, this.parentId)
                 .subscribe(this.onGetOccurrencesSuccess, this.onGetOccurrencesError);
  }

  private onGetOccurrencesSuccess = (resp) => {
    this.occurrencesService.occurrencesByDate = resp.events;
    this.occurrencesService.occurrenceTotalCount = resp.total_count;
    this.occurrencesService.occurrencesLoading = false;
  }

  private onGetOccurrencesError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
    this.occurrencesService.occurrencesLoading = false;
  }

  private getEvent(projectId, id) {
    this.eventService.event = null;
    this.eventAPI.get(projectId, id).subscribe(this.onGetSuccess, this.onGetError);
  }

  private eventParams(status) {
    return { event: { status } };
  }

  private onGetSuccess = (resp) => {
    this.event = resp;
    this.eventService.event = resp;
    this.getOccurrences();
  }

  private onGetError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onUpdateStatusSuccess = (resp) => {
    this.notifyService.showSuccess('Status has been updated');
    this.event.status = resp.status;
  }

  private onUpdateStatusError = (error) => {
    this.notifyService.showApiError(error);
  }
}
