import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUserAPI, UserAPI, PasswordAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUserAPI,
   UserAPI,
   PasswordAPI
  ]
})

export class ApiModule {}
