import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.html'
})

export class ProjectCreate {
  constructor(private router: Router) { }

  createProject() {
    this.router.navigate(['dashboard']);
  }
}
