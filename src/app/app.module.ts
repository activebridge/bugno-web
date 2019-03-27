import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularTokenModule } from 'angular-token';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login, Registration, Dashboard, Navbar, LoginForm, RegistrationForm } from './components';
import { environment } from '../environments/environment';
import { AuthGuard, BaseGuard, PublicGuard } from './guards';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Dashboard,
    Registration,
    Navbar,
    LoginForm,
    RegistrationForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularTokenModule.forRoot({
      apiBase: environment.apiEndpoint,
      signInPath: 'api/sign_in',
      registerAccountPath: 'api/',
      signOutPath: 'api/sign_out'
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [BaseGuard, AuthGuard, PublicGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
