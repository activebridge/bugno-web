import { Component, Input } from '@angular/core';

import { isEmpty } from 'lodash';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.html',
  styleUrls: ['./project-item.scss']
})

export class ProjectsItem {
  @Input() project: any = {};

  isEmpty(project) {
    return isEmpty(project.description);
  }

}
