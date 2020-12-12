import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI, ProjectUserAPI, SubscriptionAPI, PlanAPI, IntegrationsAPI, EventCollectionsAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI,
   ProjectUserAPI,
   SubscriptionAPI,
   PlanAPI,
   IntegrationsAPI,
   EventCollectionsAPI
  ]
})

export class ApiModule {}
