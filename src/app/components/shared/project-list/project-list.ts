import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services';

import { ProjectAPI } from '../../../api';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.html'
})

export class ProjectList implements OnInit {
  loading = true;
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
    this.loading = false;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
  }
}
