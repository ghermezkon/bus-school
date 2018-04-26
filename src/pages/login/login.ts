import { Component } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AuthService } from "../../service/AuthService";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { Storage } from "@ionic/storage";
@Component({
    selector: 'login',
    templateUrl: 'login.html',
})
export class LoginPage {
    landscape: any = false;
    registerPage: any = 'RegisterPage';
    showError: any = false;
    buttonClick: any = false;
    //----------------------------------------------------------
    constructor(private screenOrientation: ScreenOrientation, private storage: Storage,
        private _auth: AuthService, private navCtrl: NavController) { }
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
            if(res._id){
                this.showError = false;
                this.storage.set('user', res);
                this.navCtrl.setRoot('HomePage', {folder: res.user_sex.img.split('.')[0] + '-' + res.user_range.range_value})
            }else{
                this.showError = true;
            }
        })
    }
    //----------------------------------------------------------
}