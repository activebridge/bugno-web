import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularTokenModule } from 'angular-token';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SortablejsModule } from 'angular-sortablejs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login, Registration, Dashboard, Navbar, LoginForm, RegistrationForm,
         ProjectCreate, ProjectForm, Project, ProjectsList, ProjectsItem, ProjectUpdate,
         DeleteConfirm, Event, EventsBoard, EventItem, EventsList } from './components';
import { environment } from '../environments/environment';
import { AuthGuard, BaseGuard, PublicGuard } from './guards';
import { ApiModule } from './api/api.module';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Dashboard,
    Registration,
    Navbar,
    LoginForm,
    RegistrationForm,
    ProjectCreate,
    ProjectForm,
    Project,
    ProjectsList,
    ProjectsItem,
    ProjectUpdate,
    DeleteConfirm,
    Event,
    EventsBoard,
    EventItem,
    EventsList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    AngularTokenModule.forRoot({
      apiBase: environment.apiEndpoint,
      signInPath: 'api/sign_in',
      registerAccountPath: 'api/',
      signOutPath: 'api/sign_out'
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    SortablejsModule
  ],
  providers: [BaseGuard, AuthGuard, PublicGuard],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirm]
})
export class AppModule { }
