import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { compact } from 'lodash';

import { ProjectAPI } from '../../../api';

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
              private toastr: ToastrService,
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
    this.toastr.success(`${this.projectForm.value.name} was ${this.action}d`);
    this.onSubmitSuccess.emit(resp.data.id);
  }

  private onCreateError = (resp) => {
    if (resp.error.error) {
      this.toastr.error(resp.error.error);
    } else {
      this.toastr.error('Whoops! Something went wrong...');
    }
    this.submitDisabled = false;
  }
}
