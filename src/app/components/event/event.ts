import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pickBy, isNumber } from 'lodash';

import { EventService, OccurrencesService, ProjectUserService, NotificationService, LocalStorageService } from '../../services';
import { EventStatus } from '../../enums';
import { EventAPI } from '../../api';

@Component({
  selector: 'app-event',
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})
export class Event implements OnInit, OnDestroy {
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
              private eventService: EventService,
              private notifyService: NotificationService,
              private eventAPI: EventAPI,
              private router: ActivatedRoute,
              private redirect: Router) { }

  ngOnInit() {
    this.router.parent.params.subscribe(params => {
      if (params.id) { this.projectId = params.id; }
    });
    this.router.params.subscribe(params => {
      if (params.id) { this.getEvent(params.id); }
    });
  }

  ngOnDestroy() {
    this.eventService.event = null;
  }

  assignCurrenUserOrUnassign() {
    if (this.event.user_id) { return this.updateEvent({user_id: null}); }
    this.updateEvent({user_id: this.localStorageService.currentUser.id});
  }

  updateEvent(params) {
    this.eventAPI.update(this.event.project_id, this.event.id, { event:  { ...params } })
        .subscribe(this.onUpdateSuccess, this.onUpdateError);
  }

  private getEvent(id) {
    this.eventAPI.get(this.projectId, id).subscribe(this.onGetSuccess, this.onGetError);
  }

  private onGetSuccess = (resp) => {
    this.event = resp;
    this.eventService.event = resp;
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
