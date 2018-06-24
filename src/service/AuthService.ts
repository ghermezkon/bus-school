import { Injectable } from "@angular/core";
import { IUser } from "../model/IUser";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./HttpService";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Events } from "ionic-angular";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private subject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.subject.asObservable();
    headers: any;
    public token: any;
    //-----------------------------------------------------------------------------------
    constructor(public http: HttpClient, public _http: HttpService, public events: Events) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
    }
    //-----------------------------------------------------------------------------------
    signUp(data?: IUser) {
        return this.http.post<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'users', data, { observe: 'response' }).pipe(
            tap((user: any) => {
                this.token = user.headers.get('Authorization');
                this.subject.next(true);
                this.events.publish('user:login', user.body.ops[0]);
            }));
    }
    login(mobile: any, password?: any) {
        return this.http.get<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'app_login/' + mobile + '/' + password, { observe: 'response' })
            .pipe(
                tap((user: any) => {
                    if (user) {
                        this.token = user.headers.get('Authorization');
                        this.subject.next(true);
                        this.events.publish('user:login', user.body);
                    } else {
                        this.logOut();
                    }
                })
            );
    }
    updateUser(data?: IUser) {
        return this.http.put<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'users', data).pipe(
            tap((user: any) => {
                this.subject.next(true);
            }));
    }
    logOut() {
        this.subject.next(false);
        this.events.publish('user:login', null);
    }
    sendLoginStatus(value){
        this.subject.next(value);
    }
}