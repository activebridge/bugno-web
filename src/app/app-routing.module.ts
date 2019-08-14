import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Landing, Dashboard, ProjectCreate, Project, ProjectSettings,
         Event, ProjectEvents, ProjectAccess, OAuthCallback, ProjectSubscriptions,
         Plans } from './components';
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
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/event/:id',
    component: Event,
    canActivate: [AuthGuard]
  },
  {
    path: 'plans',
    component: Plans,
  },
  { path: 'oauth_callback', component: OAuthCallback, canActivate: [PublicGuard] },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
