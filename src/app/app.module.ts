import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequests } from "./configs/httpRequest";
import { NgForageModule, NgForageConfig} from 'ngforage';
import { qLocalForage } from "./services/quizStorage.service";
import { AppComponent } from './app.component';
import { GetStartedModule } from "./get-started/get-started.module";
import { HeaderModule } from "./shared/header/header.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LogoutModule } from "./logout/logout.module";
import { routeGuardService } from "./configs/route.guards";
import { APP_ROUTES } from "./configs/routing";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopInterceptor } from "./configs/httpInterceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'quiz-web-app'}),
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES),
    NgForageModule.forRoot({
      name: 'quiz-app',
      driver: "asyncStorage",
      storeName: "quiz",
      version: 1.0
  }),
    NgbModule,
    HeaderModule,
    DashboardModule,
    GetStartedModule,
    LogoutModule
  ],
  providers: [HttpRequests, 
      {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true}, 
      qLocalForage,
      routeGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {}
}
