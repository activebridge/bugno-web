import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUserAPI, SubscriptionAPI, PlanAPI, ActivityAPI, IntegrationsAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUserAPI,
   SubscriptionAPI,
   PlanAPI,
   ActivityAPI,
   IntegrationsAPI
  ]
})

export class ApiModule {}
