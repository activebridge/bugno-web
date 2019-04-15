import { NgModule } from '@angular/core';
import { ProjectAPI, EventAPI } from '../api';

@NgModule({
  providers: [
   ProjectAPI,
   EventAPI
  ]
})

export class ApiModule {}
