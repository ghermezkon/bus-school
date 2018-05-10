import { Component } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AuthService } from "../../service/AuthService";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { MessageService } from "../../util/message.service";
import { HttpService } from "../../service/HttpService";

@Component({
    selector: 'login',
    templateUrl: 'login.html',
})
export class LoginPage {
    landscape: any = false;
    registerPage: any = 'RegisterPage';
    showError: any = false;
    buttonClick: any = false;
    resp: any;
    //----------------------------------------------------------
    constructor(private screenOrientation: ScreenOrientation, private _msg: MessageService,
        private _auth: AuthService, private navCtrl: NavController, private _http: HttpService) { }
    //----------------------------------------------------------
    ngOnInit() {
        this.screenOrientation.onChange().subscribe(
            () => {
                if (this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT ||
                    this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
                    this.screenOrientation.type == this.screenOrientation.ORIENTATIONS.PORTRAIT_SECONDARY) {
                    this.landscape = false;
                } else {
                    this.landscape = true;
                }
            }
        );
    }
    //----------------------------------------------------------
    login(mobile, pass) {
        this.buttonClick = true;
        this._auth.login(mobile, pass).subscribe((res: any) => {
            if (res._id) {
                this.showError = false;
                this._msg.inMemoryInsert(res);

                this.navCtrl.setRoot('HomePage');
                this.navCtrl.popToRoot();
            } else {
                this.showError = true;
            }
        });
    }
    //----------------------------------------------------------
}