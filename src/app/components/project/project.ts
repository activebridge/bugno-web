import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../utility/notification.service';
import { ProjectAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html'
})

export class Project implements OnInit {
  projectId: number;
  project: any = {};

  constructor(private projectAPI: ProjectAPI,
              private router: ActivatedRoute,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getProject(params.id);
      }
    });
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe(this.onGetSuccess, this.onGetError);
  }

  deleteProject() {
    this.projectAPI.delete(this.projectId)
                   .subscribe(this.onDeleteSuccess, this.notifyService.showError);
  }

  private onGetSuccess = (resp) => {
    this.project = resp.data.attributes;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onDeleteSuccess = (resp) => {
    this.notifyService.showSuccess(`${this.project.name} was destroyed`);
    this.redirect.navigate(['dashboard']);
  }
}
