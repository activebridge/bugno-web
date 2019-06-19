import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { compact } from 'lodash';

import { ProjectAPI } from '../../../api';
import { NotificationService } from '../../../utility/notification.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.html'
})

export class ProjectForm implements OnInit {
  @Input() action = 'create';
  @Input() project: any = {};
  @Output() onSubmitSuccess: EventEmitter<any> = new EventEmitter();
  projectForm: FormGroup;
  submitDisabled: Boolean = false;

  ngOnInit() {
    this.init();
  }

  constructor(private fb: FormBuilder,
              private notifyService: NotificationService,
              private projectAPI: ProjectAPI) { }

  get projectParams() {
    return compact([
      this.project.id, {project: this.projectForm.value}
    ]);
  }

  submit() {
    this.submitDisabled = true;
    this.projectAPI[this.action](...this.projectParams)
                   .subscribe(this.onCreateSuccess, this.onCreateError);
  }

  init(project: any= {}) {
    this.project = project;
    this.projectForm = this.fb.group({
      name: [project.name || '', Validators.required],
      description: [project.description || '']
    });
  }

  private onCreateSuccess = (resp) => {
    this.notifyService.showSuccess(`${this.projectForm.value.name} was ${this.action}d`);
    this.onSubmitSuccess.emit(resp);
    this.submitDisabled = false;
  }

  private onCreateError = (error) => {
    this.notifyService.showError(error);
    this.submitDisabled = false;
  }
}
