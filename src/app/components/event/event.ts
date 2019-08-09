import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services';
import { pickBy, isNumber } from 'lodash';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { EventStatus } from '../../enums';
import { EventAPI } from '../../api';

@Component({
  selector: 'app-event',
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})
export class Event implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  event: any = {};
  occurrencesPage = 1;
  occurrenceTotalCount: number;
  occurrences: any = [];
  statuses = pickBy(EventStatus, isNumber);
  projectId: number;
  parentId: any;
  constructor(private router: ActivatedRoute,
              private eventAPI: EventAPI,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id && params.projectId) {
        this.projectId = params.projectId;
        this.getEvent(params.projectId, params.id);
      }
    });
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  getOccurrences() {
    this.eventAPI.getOccurrences(this.projectId, this.parentId, this.occurrencesParams).subscribe(this.onGetOccurrencesSuccess, this.onGetOccurrencesError);
  }

  updateEventStatus(status) {
    this.eventAPI.update(this.event.project_id, this.event.id, this.eventParams(status))
        .subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  occurrencesPageChanged(event: any): void {
    this.occurrencesPage = event.page;
    this.getOccurrences();
  }

  private getEvent(projectId, id) {
    this.eventAPI.get(projectId, id).subscribe(this.onGetSuccess, this.onGetError);
  }

  private get occurrencesParams() {
    return { page: this.occurrencesPage };
  }

  private eventParams(status) {
    return { event: { status } };
  }

  private setParentId() {
    this.parentId = this.event.parent_id || this.event.id;
  }

  private onGetSuccess = (resp) => {
    this.event = resp;
    this.setParentId();
  }

  private onGetError = (error) => {
    this.notifyService.showApiError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onGetOccurrencesSuccess = (resp) => {
    this.occurrences = resp.events;
    this.occurrenceTotalCount = resp.total_count;
  }

  private onGetOccurrencesError = (error) => {
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
