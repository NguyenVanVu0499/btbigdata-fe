import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginFormComponent } from './features/form/login-form/login-form.component';
import { UserFormComponent } from './features/form/user-form/user-form.component';
import { appInitializer } from './interceptor/app.initializer';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { StatisticTableComponent } from './features/table/statistic-table/statistic-table.component';
import { ReportTableComponent } from './features/table/report-table/report-table.component';

@NgModule({
  declarations: [
    AppComponent,
    // ReportTableComponent,
    // StatisticTableComponent,

    // LayoutComponent,
    // LoginFormComponent,
    // UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
