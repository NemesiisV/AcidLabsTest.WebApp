import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MaterialModule } from '@app/material.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { HttpCustomInterceptor } from './services/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://cognito-idp.sa-east-1.amazonaws.com/sa-east-1_VLnPO8inU',
        redirectUrl: window.location.origin+'/callback',
        postLogoutRedirectUri: window.location.origin,
        clientId: '2r2vi627m75u405hs8maeretl0',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Error,
      },
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
