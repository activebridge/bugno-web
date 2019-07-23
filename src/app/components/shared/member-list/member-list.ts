import { Component, Input, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { find } from 'lodash';
import { NotificationService } from '../../../services';

import { LocalStorageService } from '../../../services';
import { ProjectUserAPI } from '../../../api';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.html',
  styleUrls: ['./member-list.scss']
})
export class MemberList implements OnInit {
  currentUser: any = {};
  @Input() projectUsers: any = [];
  @Input() projectId: string;
  constructor(private projectUserAPI: ProjectUserAPI,
              private tokenService: AngularTokenService,
              private localStorageService: LocalStorageService,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.currentUser = this.localStorageService.currentUser;
  }

  get isCurrentUserOwner() {
    return find(this.projectUsers, { user_id: this.currentUser.id, role: 'owner'});
  }

  onDeleteProjectUser(projectUserId) {
    this.projectUserAPI.delete(this.projectId, projectUserId).subscribe(
      () => {
        this.onDeleteSuccess(projectUserId);
      }, this.onDeleteError);
  }

  private onDeleteSuccess = (id) => {
    const index = this.projectUsers.findIndex((projectUser) => projectUser.id == id);
    this.projectUsers.splice(index, 1);
    this.notifyService.showSuccess('User removed');
  }

  private onDeleteError = (error) => {
    this.notifyService.showError(error);
  }
}
