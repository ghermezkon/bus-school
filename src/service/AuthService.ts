import { Injectable } from "@angular/core";
import { IUser } from "../model/IUser";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./HttpService";
import { MessageService } from "../util/message.service";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private subject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.subject.asObservable();
    //-----------------------------------------------------------------------------------
    constructor(private http: HttpClient, private _http: HttpService) { }
    //-----------------------------------------------------------------------------------
    signUp(data?: IUser) {
        return this.http.post<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'users', data).pipe(
            tap((user: any) => {
                this.subject.next(true);
            }));
    }
    login(mobile: any, password?: any) {
        return this.http.get<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'app_login/' + mobile + '/' + password)
            .pipe(
            tap((user: any) => {
                if (user) {
                    this.subject.next(true);
                } else {
                    this.logOut();
                }
            }));
    }
    updateUser(data?: IUser) {
        return this.http.put<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'users', data).pipe(
            tap((user: any) => {
                this.subject.next(true);
            }));
    }
    logOut() {
        this.subject.next(false);
    }
}