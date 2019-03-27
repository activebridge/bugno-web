import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login, Registration, Dashboard, ProjectCreate } from './components';
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
    path: 'project/create',
    component: ProjectCreate,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
