import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularTokenModule } from 'angular-token';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login } from './login/login';
import { environment } from "../environments/environment";
import { Dashboard } from './dashboard/dashboard';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Dashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularTokenModule.forRoot({
      apiBase: environment.apiEndpoint,
      signInPath: 'api/sign_in'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
