import { Component, OnInit } from '@angular/core';

import { ProjectAPI } from '../../../api';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.html',
})

export class ProjectsList implements OnInit {
  projects: any = [];

  constructor(private projectAPI: ProjectAPI) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectAPI.query().subscribe((response: any) => {
      this.projects = response.data;
    });
  }
}
