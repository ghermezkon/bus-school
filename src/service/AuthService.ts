import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IUser } from "../model/IUser";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./HttpService";
import 'rxjs/add/operator/do';
import { MessageService } from "../util/message.service";

@Injectable()
export class AuthService {
    private subject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.subject.asObservable();
    //-----------------------------------------------------------------------------------
    constructor(private http: HttpClient, private _http: HttpService) { }
    //-----------------------------------------------------------------------------------
    signUp(data?: IUser) {
        return this.http.post<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'users', data)
            .do((user: any) => {
                this.subject.next(true);
            });
    }
    login(mobile: any, password?: any) {
        return this.http.get<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'app_login/' + mobile + '/' + password)
            .do((user: any) => {
                if (user) {
                    this.subject.next(true);
                } else {
                    this.logOut();
                }
            });
    }
    updateUser(data?: IUser) {
        return this.http.put<IUser>(this._http.getUrlPoint() + this._http.getUrlApp() + 'users', data)
            .do((user: any) => {
                this.subject.next(true);
            });
    }
    logOut() {
        this.subject.next(false);
    }
}