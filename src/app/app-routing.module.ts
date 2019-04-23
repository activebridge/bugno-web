import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login, Registration, Dashboard, ProjectCreate, Project, ProjectUpdate,
         Event, ProjectEvents, ProjectAccess } from './components';
import { AuthGuard, PublicGuard } from './guards';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [PublicGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: Registration,
    canActivate: [PublicGuard]
  },
  {
    path: 'projects/new',
    component: ProjectCreate,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id/edit',
    component: ProjectUpdate,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id',
    component: Project,
    children: [
      {path: '', redirectTo: 'events', pathMatch: 'full'},
      {path: 'events', component: ProjectEvents},
      {path: 'access', component: ProjectAccess},
      {path: 'settings', component: ProjectEvents}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/event/:id',
    component: Event,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
