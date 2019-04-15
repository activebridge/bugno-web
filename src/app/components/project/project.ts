import { Component, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';
import { DeleteConfirm } from '../shared/delete-confirm/delete-confirm';

import { ProjectAPI, EventAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
})

export class Project implements OnInit {
  project: any = {};
  events: any = [];

  constructor(private projectAPI: ProjectAPI,
              private eventAPI: EventAPI,
              private modalService: BsModalService,
              private router: ActivatedRoute,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
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

  deleteProject() {
    this.projectAPI.delete(this.project.id)
                   .subscribe(this.onDeleteSuccess, this.notifyService.showError);
  }

  confirmDelete() {
    const modal = this.modalService.show(DeleteConfirm, {class: 'modal-md', backdrop: true});
    modal.content.projectName = this.project.name;
    modal.content.onClose.subscribe((result) => {
      if (result) {
        this.deleteProject();
      }
    });
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

  private onDeleteSuccess = (resp) => {
    this.notifyService.showSuccess(`${this.project.name} was destroyed`);
    this.redirect.navigate(['dashboard']);
  }
}
