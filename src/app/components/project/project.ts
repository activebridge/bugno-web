import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html'
})

export class Project implements OnInit {
  constructor(private projectAPI: ProjectAPI,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectAPI.get(this.route.snapshot.params['id']).subscribe(
    (data)  => { console.log(data) }
    );
  }

}
