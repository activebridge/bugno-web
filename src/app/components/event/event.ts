import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';
import { pickBy, isNumber } from 'lodash';

import { EventStatus } from '../../enums/event_statuses';
import { EventAPI } from '../../api';

@Component({
  selector: 'app-event',
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})
export class Event implements OnInit {
  event: any = {};
  statuses = pickBy(EventStatus, isNumber);

  constructor(private router: ActivatedRoute,
              private eventAPI: EventAPI,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id && params.projectId) {
        this.getEvent(params.projectId, params.id);
      }
    });
  }

  getEvent(projectId, id) {
    this.eventAPI.get(projectId, id).subscribe(this.onGetSuccess, this.onGetError);
  }

  updateEventStatus(status) {
    this.eventAPI.update(this.event.project_id, this.event.id, this.eventParams(status) ).subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  isProjectException(fileName) {
    return fileName.includes(this.event.server_data.root);
  }

  private eventParams(status) {
    return { event: { status: status.toLowerCase() } };
  }

  private onGetSuccess = (resp) => {
    this.event = resp.data.attributes;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onUpdateStatusSuccess = (resp) => {
    this.notifyService.showSuccess('Status has been updated');
    this.event.status = resp.data.attributes.status;
  }

  private onUpdateStatusError = (error) => {
    this.notifyService.showError(error);
  }
}
