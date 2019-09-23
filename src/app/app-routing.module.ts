import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  Landing, Dashboard, ProjectCreate, Project, ProjectSettings,
  Event, ProjectEvents, ProjectAccess, ProjectSubscriptions,
  ProjectIntegrations, Plans, EventTrace, EventRequestData, EventOccurrences,
  Docs, DocsCreateProject, DocsBrowserJs, DocsRor, DocsAngular,
} from './components';
import { AuthGuard, PublicGuard } from './guards';

const routes: Routes = [
  {
    path: 'landing',
    component: Landing,
    canActivate: [PublicGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'docs',
    component: Docs,
    children: [
      {path: '', redirectTo: 'create-project', pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'create-project', component: DocsCreateProject, canActivate: [AuthGuard]},
      {path: 'ruby-on-rails', component: DocsRor, canActivate: [AuthGuard]},
      {path: 'browser-js', component: DocsBrowserJs, canActivate: [AuthGuard]},
      {path: 'angular', component: DocsAngular, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'projects/new',
    component: ProjectCreate,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id',
    component: Project,
    children: [
      {path: '', redirectTo: 'events', pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'events', component: ProjectEvents, canActivate: [AuthGuard]},
      {path: 'access', component: ProjectAccess, canActivate: [AuthGuard]},
      {path: 'settings', component: ProjectSettings, canActivate: [AuthGuard]},
      {path: 'subscriptions', component: ProjectSubscriptions, canActivate: [AuthGuard]},
      {path: 'integrations', component: ProjectIntegrations, canActivate: [AuthGuard]},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/event/:id',
    component: Event,
    children: [
      {path: '', redirectTo: 'trace', pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'trace', component: EventTrace, canActivate: [AuthGuard]},
      {path: 'request-data', component: EventRequestData, canActivate: [AuthGuard]},
      {path: 'occurrences', component: EventOccurrences, canActivate: [AuthGuard]},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'plans',
    component: Plans,
  },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
