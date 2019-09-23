import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { DatePipe } from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { AngularTokenModule } from 'angular-token';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SortablejsModule } from 'ngx-sortablejs';
import { ClipboardModule } from 'ngx-clipboard';
import { TimeAgoPipe } from 'time-ago-pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxStripeModule } from 'ngx-stripe';
import { PaginationModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Landing, Dashboard, Docs, DocsCreateProject, DocsRor, DocsBrowserJs, DocsAngular,
         Navbar, ProjectCreate, ProjectForm, Project,
         ProjectList, ProjectsItem, ProjectSettings, DeleteConfirm, Event, ProjectEvents,
         EventList, ProjectAccess, MemberList, InviteMember, ConfirmModal,
         ProjectSubscriptions, ProjectIntegrations, AddSubscription, Subscription, Plans, SubscriptionForm,
         ChangeSubscriptionPlan, ActivityList, ActivityEventItem, EventTrace, EventRequestData,
         EventOccurrences } from './components';
import { environment } from '../environments/environment';
import { AuthGuard, BaseGuard, PublicGuard } from './guards';
import { ApiModule } from './api/api.module';
import { AuthInterceptor, BugnoService, bugnoFactory, BugnoErrorHandler, ActionCableService,
         GlobalEvents, ProjectService, EventService, OccurrencesService, ProjectUserService } from './services';
import { ConfirmDirective } from './directives/confirm/confirm.directive';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    Landing,
    Dashboard,
    Docs,
    DocsCreateProject,
    DocsRor,
    DocsBrowserJs,
    DocsAngular,
    Navbar,
    ProjectCreate,
    ProjectForm,
    ProjectList,
    ProjectsItem,
    Project,
    ProjectEvents,
    ProjectAccess,
    ProjectSettings,
    ProjectSubscriptions,
    ProjectIntegrations,
    DeleteConfirm,
    EventList,
    Event,
    EventTrace,
    EventRequestData,
    EventOccurrences,
    MemberList,
    InviteMember,
    ConfirmDirective,
    ConfirmModal,
    TimeAgoPipe,
    AddSubscription,
    SubscriptionForm,
    Subscription,
    ChangeSubscriptionPlan,
    Plans,
    ActivityList,
    ActivityEventItem,
  ],
  imports: [
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    TooltipModule.forRoot(),
    AngularTokenModule.forRoot({
      apiBase: environment.apiEndpoint,
      signInRedirect: 'landing',
      oAuthBase: environment.apiEndpoint,
      oAuthPaths: {
        github: 'auth/github',
        slack: 'auth/slack'
      },
      signOutFailedValidate: true
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
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 }),
    ClipboardModule,
    InfiniteScrollModule,
    NgxStripeModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [
    BaseGuard,
    AuthGuard,
    PublicGuard,
    ActionCableService,
    GlobalEvents,
    ProjectService,
    EventService,
    OccurrencesService,
    ProjectUserService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: ErrorHandler, useClass: BugnoErrorHandler },
    { provide: BugnoService, useFactory: bugnoFactory }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirm, ConfirmModal]
})
export class AppModule { }
