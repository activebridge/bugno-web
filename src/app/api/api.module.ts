import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUserAPI, UserAPI, SubscriptionAPI, PlanAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUserAPI,
   UserAPI,
   SubscriptionAPI,
   PlanAPI
  ]
})

export class ApiModule {}
