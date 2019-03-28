import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})

export class Project implements OnInit {
  project:any = {};

  constructor(private projectAPI: ProjectAPI,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.getProject(params['id']);
      }
    });
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe((response:any) => {
      this.project = response.data.attributes;
    });
  }
}
