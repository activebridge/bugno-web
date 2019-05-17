import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUsersAPI, UserAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUsersAPI,
   UserAPI
  ]
})

export class ApiModule {}
