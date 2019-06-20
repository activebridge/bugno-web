import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Landing, Dashboard, ProjectCreate, Project, ProjectSettings,
         Event, ProjectEvents, ProjectAccess, Settings, SettingsProfile,
         OAuthCallback, ProjectSubscriptions } from './components';
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
      {path: '', redirectTo: 'events', pathMatch: 'full'},
      {path: 'events', component: ProjectEvents},
      {path: 'access', component: ProjectAccess},
      {path: 'settings', component: ProjectSettings},
      {path: 'subscriptions', component: ProjectSubscriptions},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/event/:id',
    component: Event,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: Settings,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: SettingsProfile},
    ],
    canActivate: [AuthGuard]
  },
  { path: 'oauth_callback', component: OAuthCallback, canActivate: [PublicGuard] },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
