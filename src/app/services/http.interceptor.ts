import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { Observable } from "rxjs";

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {
    constructor(private _oidcSecurityService: OidcSecurityService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.startsWith(environment.urlApi)){
            const headers = request.headers
                .set("Authorization", `Bearer ${this._oidcSecurityService.getAccessToken()}`);
            return next.handle(request.clone({headers}));
        }
        else{
            return next.handle(request);
        }
    }
}