import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUsersAPI, UserAPI, PasswordsAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUsersAPI,
   UserAPI,
   PasswordsAPI
  ]
})

export class ApiModule {}
