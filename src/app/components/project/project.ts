import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';

import { ProjectAPI, EventAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})

export class Project implements OnInit {
  project: any = {};
  projectId: number;
  events: any = [];
  tabs: any = [
    {title: 'Events', url: 'events'},
    {title: 'Access', url: 'access'},
    {title: 'Settings', url: 'settings'}
  ];

  constructor(private projectAPI: ProjectAPI,
              private eventAPI: EventAPI,
              private router: ActivatedRoute,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getProject(params.id);
        this.getEvents(params.id);
      }
    });
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe(this.onGetSuccess, this.onGetError);
  }

  getEvents(projectId) {
    this.eventAPI.query(projectId).subscribe(this.onGetEventsSuccess, this.onGetEventsError);
  }

  private onGetSuccess = (resp) => {
    this.project = resp.data.attributes;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onGetEventsSuccess = (resp) => {
    this.events = resp.data;
  }

  private onGetEventsError = (error) => {
    this.notifyService.showError(error);
  }
}
