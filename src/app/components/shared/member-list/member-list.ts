import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../utility/notification.service';

import { ProjectUsersAPI } from '../../../api';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.html',
})
export class MemberList implements OnInit {
  projectUsers: any = [];

  constructor(private projectUsersAPI: ProjectUsersAPI,
              private router: ActivatedRoute,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.parent.params.subscribe(params => {
      if (params.id) {
        this.getProjectUsers(params.id);
      }
    });
  }

  getProjectUsers(projectId) {
    this.projectUsersAPI.query(projectId).subscribe(this.onGetSuccess, this.onGetError);
  }

  private onGetSuccess = (resp) => {
    this.projectUsers = resp.data
  }

  private onGetError = (error) => {
    console.log(error)
    this.notifyService.showError(error);
  }
}
