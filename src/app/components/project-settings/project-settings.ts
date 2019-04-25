import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';
import { ClipboardService } from 'ngx-clipboard';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeleteConfirm } from '../shared/delete-confirm/delete-confirm';

import { ProjectAPI } from '../../api';
import { ProjectForm } from '../shared/project-form/project-form';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.html',
})

export class ProjectSettings implements OnInit {
  @ViewChild(ProjectForm) projectForm: ProjectForm;
  project: any = {};

  constructor(private router: ActivatedRoute,
              private projectAPI: ProjectAPI,
              private modalService: BsModalService,
              private redirect: Router,
              private clipboardService: ClipboardService,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.parent.params.subscribe(params => {
      if (params.id) {
        this.getProject(params.id);
      }
    });
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe(this.onGetSuccess, this.onGetError);
  }

  deleteProject() {
    this.projectAPI.delete(this.project.id)
                   .subscribe(this.onDeleteSuccess, this.notifyService.showError);
  }

  copyApiKey() {
    this.clipboardService.copyFromContent(this.project.api_key);
    this.notifyService.showSuccess('API Key copied to clipboard.');
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

  onProjectUpdate(project) {
    this.project = project;
  }

  private onGetSuccess = (resp) => {
    this.project = resp.data.attributes;
    this.projectForm.init(this.project);
  }

  private onGetError = (error) => {
    this.redirect.navigate(['dashboard']);
  }

  private onDeleteSuccess = (resp) => {
    this.notifyService.showSuccess(`${this.project.name} was destroyed`);
    this.redirect.navigate(['dashboard']);
  }
}
