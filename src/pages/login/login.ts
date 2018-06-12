import { Component } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AuthService } from "../../service/AuthService";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { MessageService } from "../../util/message.service";
import { HttpService } from "../../service/HttpService";

// import * as cryptico from 'cryptico';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
})
export class LoginPage {
    registerPage: any = 'RegisterPage';
    showError: any = false;
    buttonClick: any = false;
    //----------------------------------------------------------
    constructor(private _msg: MessageService,
        public _auth: AuthService, private navCtrl: NavController, public _http: HttpService) { }
    //----------------------------------------------------------
    ngOnInit() {}
    //----------------------------------------------------------
    login(mobile, pass) {
        this.buttonClick = true;
        this._auth.login(mobile, pass).subscribe((res: any) => {
            if (res.body._id) {
                this.showError = false;
                this._msg.inMemoryInsert(res.body);
                this.navCtrl.setRoot('HomePage');
                this.navCtrl.popToRoot();
            } else {
                this.showError = true;
            }
        });
    }
    //----------------------------------------------------------
}