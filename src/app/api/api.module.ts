import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUserAPI, SubscriptionAPI, PlanAPI, IntegrationsAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUserAPI,
   SubscriptionAPI,
   PlanAPI,
   IntegrationsAPI
  ]
})

export class ApiModule {}
