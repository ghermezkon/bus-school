import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './LoaderService';
import { AuthService } from './AuthService';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    //------------------------------------------------------------------------------
    constructor(public _loader: LoaderService, public _auth: AuthService) { }
    //------------------------------------------------------------------------------
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loader.show().present();
        let changeRequest = req.clone();
        if (this._auth.token) {
            changeRequest = req.clone({
                setHeaders: {
                    Authorization: this._auth.token,
                    'Content-Type': 'application/json',
                }
            });
        }
        return next.handle(changeRequest).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this._loader.hide();
            }
        }));
    }
}