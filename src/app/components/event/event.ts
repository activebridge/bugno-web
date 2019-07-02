import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';
import { pickBy, isNumber } from 'lodash';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { EventStatus } from '../../enums/event_statuses';
import { EventAPI } from '../../api';

@Component({
  selector: 'app-event',
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})
export class Event implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  event: any = {};
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

  getEvent(projectId, id) {
    this.eventAPI.get(projectId, id).subscribe(this.onGetSuccess, this.onGetError);
  }

  getOccurrences() {
    this.eventAPI.queryOccurrences(this.projectId, this.parentId).subscribe(this.onGetOccurrencesSuccess, this.onGetOccurrencesError);
  }

  updateEventStatus(status) {
    this.eventAPI.update(this.event.project_id, this.event.id, this.eventParams(status))
        .subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  private eventParams(status) {
    return { event: { status: status.toLowerCase() } };
  }

  private setParentId() {
    this.parentId = this.event.parent_id || this.event.id;
  }

  private onGetSuccess = (resp) => {
    this.event = resp;
    this.setParentId();
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onGetOccurrencesSuccess = (resp) => {
    this.occurrences = resp;
  }

  private onGetOccurrencesError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onUpdateStatusSuccess = (resp) => {
    this.notifyService.showSuccess('Status has been updated');
    this.event.status = resp.status;
  }

  private onUpdateStatusError = (error) => {
    this.notifyService.showError(error);
  }
}
