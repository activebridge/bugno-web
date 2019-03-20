import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './login/login';


const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
