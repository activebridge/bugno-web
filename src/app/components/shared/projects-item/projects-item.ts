import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.html',
})

export class ProjectsItem {
  @Input() project:any = {};
}
