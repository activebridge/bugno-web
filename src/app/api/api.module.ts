import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUsersAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUsersAPI
  ]
})

export class ApiModule {}
