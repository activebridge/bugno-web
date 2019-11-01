import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';

import { EventService, OccurrencesService, NotificationService } from '../../../services';
import { EventAPI } from '../../../api';
import { scrollToTop } from '../../../lib';

@Component({
  selector: 'app-event-occurrences',
  templateUrl: './event-occurrences.html',
  styleUrls: ['./event-occurrences.scss']
})

export class EventOccurrences {
  isEmpty = isEmpty;
  occurrencesPage = 1;

  constructor(public eventService: EventService,
              public occurrencesService: OccurrencesService,
              private eventAPI: EventAPI,
              private notifyService: NotificationService,
              private redirect: Router) { }

  get parentId() {
    return this.eventService.event.parent_id || this.eventService.event.id;
  }

  get occurrencesParams() {
    return { page: this.occurrencesPage };
  }

  occurrencesPageChanged(event: any): void {
    scrollToTop();
    this.occurrencesPage = event.page;
    this.getOccurrences();
  }

  getOccurrences() {
    this.eventAPI.getOccurrences(this.eventService.event.project_id, this.parentId, this.occurrencesParams)
                 .subscribe(this.onGetOccurrencesSuccess, this.onGetOccurrencesError);
  }

  private onGetOccurrencesSuccess = (resp) => {
    this.occurrencesService.occurrences = resp.events;
    this.occurrencesService.occurrenceTotalCount = resp.meta.total_count;
  }

  private onGetOccurrencesError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
  }
}
