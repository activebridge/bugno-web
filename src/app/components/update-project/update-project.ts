import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectAPI } from '../../api';
import { ProjectForm } from '../shared/project-form/project-form';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.html'
})

export class ProjectUpdate implements OnInit {
  @ViewChild(ProjectForm) projectForm: ProjectForm;
  project: any = {};

  constructor(private redirect: Router,
              private projectAPI: ProjectAPI,
              private router: ActivatedRoute, ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.getProject(params.id);
      }
    });
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe(this.onGetSuccess, this.onGetError);
  }

  goToProject(id) {
    this.redirect.navigate(['projects', id]);
  }

  private onGetSuccess = (resp) => {
    this.project = resp.data.attributes;
    this.projectForm.init(this.project);
  }

  private onGetError = (error) => {
    this.redirect.navigate(['dashboard']);
  }
}
