import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pickBy, isNumber } from 'lodash';

import { EventService, OccurrencesService, ProjectUserService, NotificationService, LocalStorageService } from '../../services';
import { EventStatus } from '../../enums';
import { EventAPI, ProjectUserAPI } from '../../api';

@Component({
  selector: 'app-event',
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
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
              public projectUserService: ProjectUserService,
              private localStorageService: LocalStorageService,
              private projectUserAPI: ProjectUserAPI,
              private eventService: EventService,
              private notifyService: NotificationService,
              private eventAPI: EventAPI,
              private router: ActivatedRoute,
              private redirect: Router) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id && params.projectId) {
        this.projectId = params.projectId;
        this.getEvent(params.id);
        this.getProjectUsers();
      }
    });
  }

  assignCurrenUserOrUnassign() {
    if (this.event.user_id) { return this.updateEvent({user_id: null}); }
    this.updateEvent({user_id: this.localStorageService.currentUser.id});
  }

  get parentId() {
    return this.event.parent_id || this.event.id;
  }

  updateEvent(params) {
    this.eventAPI.update(this.event.project_id, this.event.id, { event:  { ...params } })
        .subscribe(this.onUpdateSuccess, this.onUpdateError);
  }

  getProjectUsers() {
    this.projectUserAPI.query(this.projectId).subscribe(this.onGetUsersSuccess, this.onGetError);
  }

  getOccurrences() {
    this.occurrencesService.occurrencesByDate = null;
    this.occurrencesService.occurrenceTotalCount = 0;
    this.occurrencesService.occurrencesLoading = true;
    this.eventAPI.getOccurrences(this.event.project_id, this.parentId)
                 .subscribe(this.onGetOccurrencesSuccess, this.onGetOccurrencesError);
  }

  private onGetOccurrencesSuccess = (resp) => {
    this.occurrencesService.occurrences = resp.events;
    this.occurrencesService.occurrenceTotalCount = resp.meta.total_count;
    this.occurrencesService.occurrencesLoading = false;
  }

  private onGetOccurrencesError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
    this.occurrencesService.occurrencesLoading = false;
  }

  private getEvent(id) {
    this.eventService.event = null;
    this.eventAPI.get(this.projectId, id).subscribe(this.onGetSuccess, this.onGetError);
  }

  private onGetUsersSuccess = (resp) => {
    this.projectUserService.projectUsers = resp;
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

  private onUpdateSuccess = (resp) => {
    this.event = resp;
    this.notifyService.showSuccess('Event has been updated');
  }

  private onUpdateError = (error) => {
    this.notifyService.showApiError(error);
  }
}
