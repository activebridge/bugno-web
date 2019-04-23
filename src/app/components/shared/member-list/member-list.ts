import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../utility/notification.service';

import { ProjectUsersAPI } from '../../../api';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.html',
})
export class MemberList {
  @Input() projectUsers: any = [];
  @Input() projectId: string;
  constructor(private projectUsersAPI: ProjectUsersAPI,
              private router: ActivatedRoute,
              private notifyService: NotificationService) { }

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
