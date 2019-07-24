import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services';

import { ProjectAPI } from '../../../api';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.html',
})

export class ProjectsList implements OnInit {
  projects: any = [];

  constructor(private projectAPI: ProjectAPI,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectAPI.query().subscribe(this.onGetSuccess, this.onGetError);
  }

  private onGetSuccess = (resp) => {
    this.projects = resp;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
  }
}
