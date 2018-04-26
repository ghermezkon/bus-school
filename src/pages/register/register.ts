import { Component } from "@angular/core";
import { IonicPage, AlertController, NavController } from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { MessageService } from "../../util/message.service";
import { HttpService } from "../../service/HttpService";
import { Observable } from "rxjs/Observable";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { CustomeValidator } from "../../util/CustomValidator";
import { LoaderService } from "../../service/LoaderService";
import { IUser } from "../../model/IUser";
import { AuthService } from "../../service/AuthService";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import { Storage } from "@ionic/storage";
//----------------------------------------------------------
@IonicPage()
@Component({
    selector: 'register-page',
    templateUrl: 'register.html',
})
export class RegisterPage {
    landscape: any = false;
    day_list: any[] = [];
    month_list: any[] = [];
    year_list: any[] = [];
    level_panel: number = 1;

    userInfo: IUser = new IUser();
    range_list: any[] = [];
    user_sex: any[] = [];
    study_list: Observable<Object>;
    dataForm: FormGroup;
    codeForm: FormGroup;
    passwordForm: FormGroup;
    error_security_code: boolean = false;
    token: any;
    //----------------------------------------------------
    counter: any;
    showSecurityCode: any = false;
    securityButtonText: any = 'دریافت کد امنیتی';
    securityLabelText: any = 'undifined';
    //----------------------------------------------------
    validation_msg = {
        'mobile': [
            { type: 'required', message: 'الزامی' },
            { type: 'minlength', message: 'حداقل 11 کاراکتر وارد نمائید' },
            { type: 'maxlength', message: 'حداکثر 11 کاراکتر وارد نمائید' },
            { type: 'isMobile', message: 'شماره همراه اشتباه است' },
            { type: 'mobileInUse', message: 'شماره همراه تکراری است' },
        ],
        'security_code': [
            { type: 'required', message: 'الزامی' },
            { type: 'minlength', message: 'حداقل 6 کاراکتر وارد نمائید' },
            { type: 'maxlength', message: 'حداکثر 6 کاراکتر وارد نمائید' },
            { type: 'wrongCode', message: 'کد تائید اشتباه است' }
        ],
        'password': [
            { type: 'MatchPassword', message: 'رمز عبور همخوانی ندارد' }
        ]
    }
    //----------------------------------------------------
    constructor(private _msg: MessageService,private navCtrl: NavController,private storage: Storage,
        private fb: FormBuilder, private screenOrientation: ScreenOrientation, private auth: AuthService,
        private _http: HttpService, private _loader: LoaderService) { }
    //----------------------------------------------------
    ionViewWillLoad() {
        this.range_list = this._msg.getUserRange();
        this.dataForm = this.fb.group({
            family: ['', Validators.compose([Validators.required])],
            birthdate: ['', Validators.compose([Validators.required])],
            mobile: ['',
                Validators.compose(
                    [CustomeValidator.isMobile, Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
                [this.asyncMobileInUse.bind(this)]],
        });
        this.codeForm = this.fb.group({
            security_code: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
        });
        this.passwordForm = this.fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([Validators.required])]
        }, {
                validator: CustomeValidator.MatchPassword
            })
    }
    //----------------------------------------------------
    rangeItemClick(data?: any) {
        this.userInfo.user_range = data;
        this.user_sex = data.user_sex_pic;
        this.level_panel = 2
    }
    sexItemClick(data) {
        this.userInfo.user_sex = data;
        this.level_panel = 3;
        this._loader.show().present().then(() => {
            this._http.find_study_by_name(this.userInfo.user_range['user_range_value']).take(1).subscribe((res: any) => {
                this.study_list = res;
            })
            this._loader.hide();
        })
    }
    studyItemClick(data) {
        this.userInfo.study = data;
        this.level_panel = 4;
    }
    familyItemClick() {
        this.userInfo.user_info = this.dataForm.value;
        this.level_panel = 5;
    }
    passwordItemClick() {
        this._loader.show().present().then(() => {
            this._http.generate_security_code(this.dataForm.value.mobile).take(1).subscribe((res: any) => {
                this.token = res.headers.get('s-token');
                if (res.body) {
                    this.userInfo.password = this.passwordForm.get('password').value;
                    this.level_panel = 6;
                    this.error_security_code = false;
                    this.runTimer(120);
                } else {
                    this.error_security_code = true;
                }
            });
            this._loader.hide();
        })
    }
    securityItemClick() {
        this._http.check_security_code(this.codeForm.get('security_code').value, this.token).subscribe((res: any) => {
            if (res) {
                this.level_panel = 7;
                this.userInfo.isEnabled = true;
                this.userInfo.isUser = true;
                this.auth.signUp(this.userInfo).take(1).subscribe((res: any) => {
                    if (res.result.n >= 1) {//Success    
                        this.storage.set('user', res.ops[0]);                   
                        this.navCtrl.setRoot('HomePage', {folder: res.user_sex.img.split('.')[0] + '-' + res.user_range.range_value});
                    }
                })
            } else {
                this.codeForm.get('security_code').setErrors({ wrongCode: true });
            }
        })
    }
    //-------------------------------------------------------------------------
    asyncMobileInUse(control: FormControl) {
        return new Observable((obs) => {
            this._loader.show().present().then(() => {
                this._http.mobile_in_use(control.value).take(1).subscribe((res: any) => {
                    if (res == true) obs.next({ mobileInUse: true });
                    else obs.next(null);
                });
                this._loader.hide();
            })
        }).debounceTime(500).distinctUntilChanged().first();
    }
    //------------------------------------------------------------------------
    runTimer(seconds) {
        this.counter = seconds;
        var interval = setInterval(() => {
            this.counter--;
            this.securityButtonText = `بررسی کد امنیتی (${this.counter})`;
            if (this.counter < 0) {
                clearInterval(interval);
            };
        }, 1300);
    }
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
    
}