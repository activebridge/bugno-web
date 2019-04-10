import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';
import { toString, indexOf } from 'lodash';

import { EventAPI } from '../../api';

@Component({
  selector: 'app-event',
  templateUrl: './event.html',
})
export class Event implements OnInit {
  event: any = {};
  statuses: any = ['active', 'resolved', 'muted'];

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
    this.eventAPI.update(this.event.project_id, this.event.id, { event: { status: toString(indexOf(this.statuses, status)) } }).subscribe(this.onUpdateStatusSuccess, this.onUpdateStatusError);
  }

  private onGetSuccess = (resp) => {
    this.event = resp.data.attributes;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onUpdateStatusSuccess = (resp) => {
    this.event.status = resp.data.attributes.status;
  }

  private onUpdateStatusError = (error) => {
    this.notifyService.showError(error);
  }
}
