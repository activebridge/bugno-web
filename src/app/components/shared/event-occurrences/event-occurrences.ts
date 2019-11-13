import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventService, OccurrencesService, NotificationService } from '../../../services';
import { EventAPI } from '../../../api';
import { scrollToTop } from '../../../lib';

@Component({
  selector: 'app-event-occurrences',
  templateUrl: './event-occurrences.html',
  styleUrls: ['./event-occurrences.scss']
})

export class EventOccurrences implements OnInit {
  eventGroups: any = [];
  eventsTotalCount: number;
  occurrencesPage = 1;
  projectId: string;
  parentId: number;
  loading = true;

  constructor(private occurrencesService: OccurrencesService,
              private eventAPI: EventAPI,
              private notifyService: NotificationService,
              private router: ActivatedRoute,
              private redirect: Router) { }

  ngOnInit() {
    this.router.parent.parent.params.subscribe(params => {
      if (params.id) { this.projectId = params.id; }
    });
    this.router.parent.params.subscribe(params => {
      if (params.id) {
        this.parentId = params.id;
        this.getOccurrences();
      }
    });
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
    this.loading = true;
    this.eventAPI.getOccurrences(this.projectId, this.parentId, this.occurrencesParams)
                 .subscribe(this.onGetOccurrencesSuccess, this.onGetOccurrencesError);
  }

  private onGetOccurrencesSuccess = (resp) => {
    this.eventGroups = this.occurrencesService.groupOccurrences(resp.events);
    this.eventsTotalCount = resp.meta.total_count;
    this.loading = false;
  }

  private onGetOccurrencesError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
  }
}
