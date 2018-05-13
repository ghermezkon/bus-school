import { Component } from "@angular/core";
import { IonicPage, ToastController } from "ionic-angular";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { MessageService } from "../../../util/message.service";
import { HttpService } from "../../../service/HttpService";
import { PersianCalendar } from "../../../service/persian.calendar";
import { take } from "rxjs/operators";

@IonicPage()
@Component({
    selector: 'shekayat-page',
    templateUrl: 'shekayat.html'
})
export class ShekayatPage {
    shekayatTitle: FormControl;
    shekayatText: FormControl;
    recaptchaStr = '';
    //------------------------------------------
    constructor(private toastCtrl: ToastController, private _msg: MessageService, private _http: HttpService,
        private pc: PersianCalendar) {
        this.shekayatTitle = new FormControl('', Validators.required);
        this.shekayatText = new FormControl('', Validators.required);
    }
    //------------------------------------------
    saveClick(captchaRef: any) {
        if (this.recaptchaStr) captchaRef.reset();
        captchaRef.execute();
    }
    //------------------------------------------
    save() {
        var user = this._msg.inMemoryFindUser();
        this._http.getDate().pipe(take(1)).subscribe((res: any) => {            
            let data = {
                captchaResponse: this.recaptchaStr,
                student_id: user._id,
                shekayatTitle: this.shekayatTitle.value,
                shekayatText: this.shekayatText.value,
                last_update_long: this.pc.PersianCalendar(new Date(res[1])),
                last_update_short: this.pc.PersianCalendarShort(new Date(res[1])),
                shekayat_date: new Date(res[1]),
                responseAdmin: ''
            }
            this._http.save_shekayat(data).pipe(take(1)).subscribe((data: any) => {
                if (data.ok == 1 && data.n >= 1) {
                    this.shekayatText.reset(); this.shekayatTitle.reset();
                    let toast = this.toastCtrl.create({
                        message: 'شکایت شما ثبت و در اسرع وقت به آن رسیدگی خواهد شد',
                        duration: 2000,
                        cssClass: 'toastCss'
                    });
                    toast.present();
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'شکایت شما ثبت نگردید; خطا در ارتباط با سرور',
                        duration: 2000,
                        cssClass: 'toastCss'
                    });
                    toast.present();
                }
            })
        })
    }
    //------------------------------------------
    captchaResolved(response: string): void {
        this.recaptchaStr = response;
        if (this.recaptchaStr) this.save();
    }
    //------------------------------------------
}