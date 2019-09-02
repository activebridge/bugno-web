import { Injectable } from '@angular/core';
import { find } from 'lodash';

import { LocalStorageService } from './local-storage';

@Injectable({
  providedIn: 'root'
})

export class ProjectUserService {
  projectUsers: any[];

  constructor(private localStorageService: LocalStorageService) {}

  get isCurrentUserOwner() {
    return find(this.projectUsers, { user_id: this.localStorageService.currentUser.id, role: 'owner'});
  }
}
