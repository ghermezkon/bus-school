import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular/navigation/ionic-page";
import { MessageService } from "../../util/message.service";
import { IUser } from "../../model/IUser";
import { LoaderService } from "../../service/LoaderService";
import { HttpService } from "../../service/HttpService";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomeValidator } from "../../util/CustomValidator";
import { AuthService } from "../../service/AuthService";
import { ToastController } from "ionic-angular";

@IonicPage()
@Component({ selector: 'profile-page', templateUrl: 'profile.html' })
export class ProfilePage {
    //-----------------------------------------------------
    rangeOption: any;
    studyOption: any;
    userInfo: IUser;
    subscription: Subscription;
    //-----------------------------------------------------
    range_list: any[] = [];
    range_selected: any;
    study_list: any[] = [];
    study_selected: any;
    checkPassword: any = false;
    passwordForm: FormGroup;
    //-----------------------------------------------------
    validation_msg = {
        'password': [
            { type: 'MatchPassword', message: 'رمز عبور همخوانی ندارد' }
        ]
    }
    //-----------------------------------------------------
    constructor(private _msg: MessageService, private _loader: LoaderService, private fb: FormBuilder,
        private _http: HttpService, private auth: AuthService, private toastCtrl: ToastController) {
        this.range_list = this._msg.getUserRange();
    }
    //-----------------------------------------------------
    ionViewWillLoad() {
        this.userInfo = new IUser();
        //************************************************ */
        this.rangeOption = {
            title: 'محدوده سنی کاربر',
            subTitle: 'انتخاب محدوده سنی',
            mode: 'ios'
        };
        //************************************************ */
        this.studyOption = {
            title: 'مقطع تحصیلی',
            subTitle: 'انتخاب مقطع تحصیلی',
            mode: 'ios'
        };
        //************************************************ */
        var res = this._msg.inMemoryFindUser();
        this.userInfo = res;
        this.range_selected = this.userInfo.user_range;
        this.study_selected = this.userInfo.study;

        this._loader.show().present().then(() => {
            this.subscription = this._http.find_study_by_name(this.range_selected.user_range_value).take(1).subscribe((res: any) => {
                this.study_list = res;
            })
            this._loader.hide();
        })
        this.passwordForm = this.fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([Validators.required])]
        }, {
                validator: CustomeValidator.MatchPassword
            })
    }
    //-----------------------------------------------------
    compareFnRange(e1: any, e2: any): boolean {
        return e1 && e2 ? e1.range_value === e2.range_value : e1 === e2;
    }
    compareFnStudy(e1: any, e2: any): boolean {
        return e1 && e2 ? e1._id === e2._id : e1 === e2;
    }
    //-----------------------------------------------------
    rangeSelectChange(event) {
        this._loader.show().present().then(() => {
            this.subscription = this._http.find_study_by_name(event['user_range_value']).take(1).subscribe((res: any) => {
                this.study_list = res;
            })
            this._loader.hide();
        });
        this.study_selected = '';
    }
    passwordReset(event) {
        this.passwordForm.reset();
    }
    //-----------------------------------------------------
    updateUser() {
        this.userInfo.study = this.study_selected;
        this.userInfo.flagUpdate = true;
        if (this.checkPassword) {
            this.userInfo.password = this.passwordForm.get('password').value;
            this.userInfo.flagUpdate = false;
        }
        this.userInfo.user_range = this.range_selected;
        this._loader.show().present().then(() => {
            this.auth.updateUser(this.userInfo).take(1).subscribe((res: any) => {
                if (res.ok >= 1) {//Success              
                    this._msg.updateUser(this.userInfo);
                    let toast = this.toastCtrl.create({
                        message: 'ویرایش پروفایل انجام گردید',
                        duration: 2000,
                        cssClass: 'toastCss'
                    });
                    toast.present();
                }
            });
            this._loader.hide();
        })
    }
    //-----------------------------------------------------
    ionViewDidLeave() {
        this.subscription.unsubscribe();
    }
    //-----------------------------------------------------
}