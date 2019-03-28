import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProjectAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})

export class Project implements OnInit {
  projectId:number;
  project:any = {};

  constructor(private projectAPI: ProjectAPI,
              private router: ActivatedRoute,
              private redirect: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.projectId = params['id'];
        this.getProject(params['id']);
      }
    });
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe(this.onGetSuccess, this.onGetError);
  }

  deleteProject() {
    this.projectAPI.delete(this.projectId)
                   .subscribe(this.onDeleteSuccess, this.onDeleteError)
  }

  private onGetSuccess = (resp) => {
    this.project = resp.data.attributes;
  }

  private onGetError = (error) => {
    if (error.error.error) {
      this.toastr.error(error.error.error);
    } else {
      this.toastr.error('Whoops! Something went wrong...');
    }
    this.redirect.navigate(['dashboard']);
  }
  private onDeleteSuccess = (resp) => {
    this.toastr.success(`${this.project.name} was destroyed`);
    this.redirect.navigate(['dashboard']);
  }

  private onDeleteError = (error) => {
    if (error.error.error) {
      this.toastr.error(error.error.error);
    } else {
      this.toastr.error('Whoops! Something went wrong...');
    }
  }
}
