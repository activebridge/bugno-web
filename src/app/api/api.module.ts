import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUserAPI, SubscriptionAPI, PlanAPI, ActivityAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUserAPI,
   SubscriptionAPI,
   PlanAPI,
   ActivityAPI
  ]
})

export class ApiModule {}
