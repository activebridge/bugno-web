import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { find } from 'lodash';
import { NotificationService } from '../../../utility/notification.service';

import { ProjectUsersAPI } from '../../../api';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.html',
})
export class MemberList implements OnInit {
  currentUser: any = {};
  @Input() projectUsers: any = [];
  @Input() projectId: string;
  constructor(private projectUsersAPI: ProjectUsersAPI,
              private tokenService: AngularTokenService,
              private router: ActivatedRoute,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe( res => {
      this.currentUser = this.tokenService.currentUserData;
    });
  }

  get isCurrentUserOwner() {
    return find(this.projectUsers, {attributes: { user_id: this.currentUser.id, role: 'owner'}});
  }

  onDeleteProjectUser(projectUserId) {
    this.projectUsersAPI.delete(this.projectId, projectUserId).subscribe(
      () => {
        this.onDeleteSuccess(projectUserId);
      }, this.onDeleteError);
  }

  private onDeleteSuccess = (id) => {
    const index = this.projectUsers.findIndex((projectUser) => projectUser.id != id);
    this.projectUsers.splice(index + 1, 1);
    this.notifyService.showSuccess('User removed');
  }

  private onDeleteError = (error) => {
    this.notifyService.showError(error);
  }
}
