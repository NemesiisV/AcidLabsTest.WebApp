import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AcidLabsTest-WebApp';

  constructor(private _oidcSecurityService: OidcSecurityService) {

    this._oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      this.isAuth = isAuthenticated;
    });

  }

  private isAuth: boolean = false;

  ngOnInit() {
    if (window.location.href.indexOf("callback") == -1 && !this.isAuth) {
      this.login();
    }
  }

  login() {
    this._oidcSecurityService.authorize();
  }
}