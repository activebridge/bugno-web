import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

import { ProjectAPI } from '../../../api';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.html'
})

export class ProjectForm implements OnInit {
  @Output() onSubmitSuccess:EventEmitter<any> = new EventEmitter();
  projectForm: FormGroup;

  ngOnInit() {
    this.initProjectForm();
  }

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private projectAPI: ProjectAPI) { }

  create() {
    this.projectAPI.create({project: this.projectForm.value})
                   .subscribe(this.onCreateSuccess, this.onCreateError);
  }

  private initProjectForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  private onCreateSuccess = (data) => {
    console.log(data);
  }

  private onCreateError = (error) => {
    console.log(error);
  }
}
