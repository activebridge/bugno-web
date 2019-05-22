import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularTokenModule } from 'angular-token';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SortablejsModule } from 'angular-sortablejs';
import { ClipboardModule } from 'ngx-clipboard';
import { TimeAgoPipe } from 'time-ago-pipe';
import { GravatarModule } from  'ngx-gravatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login, Registration, Dashboard, Navbar, LoginForm, RegistrationForm,
         ProjectCreate, ProjectForm, Project, ProjectsList, ProjectsItem, ProjectSettings,
         DeleteConfirm, Event, ProjectEvents, EventsList, ProjectAccess, MemberList,
         InviteMember, ConfirmModal, Settings, SettingsProfile, SettingsSecurity, ProfileForm,
         SecurityForm, ResetPassword, ResetPasswordForm, NewPasswordForm } from './components';
import { environment } from '../environments/environment';
import { AuthGuard, BaseGuard, PublicGuard } from './guards';
import { ApiModule } from './api/api.module';
import { AuthInterceptor } from './utility';
import { ConfirmDirective } from './directives/confirm/confirm.directive';

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
    ProjectSettings,
    DeleteConfirm,
    Event,
    ProjectEvents,
    EventsList,
    ProjectAccess,
    MemberList,
    InviteMember,
    ConfirmDirective,
    ConfirmModal,
    TimeAgoPipe,
    Settings,
    SettingsProfile,
    SettingsSecurity,
    ProfileForm,
    SecurityForm,
    ResetPassword,
    ResetPasswordForm,
    NewPasswordForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    TooltipModule.forRoot(),
    AngularTokenModule.forRoot({
      apiBase: environment.apiEndpoint,
      resetPasswordCallback: `${window.location.origin}/reset-password`
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      maxOpened: 2,
      countDuplicates: true,
      progressBar: true
    }),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 }),
    ClipboardModule,
    GravatarModule.forRoot({
      size: 25,
      round: false,
      cornerRadius: 3
    })
  ],
  providers: [BaseGuard, AuthGuard, PublicGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirm, ConfirmModal]
})
export class AppModule { }
