import { Component } from "@angular/core";
import { IonicPage, ToastController } from "ionic-angular";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@IonicPage()
@Component({
    selector: 'shekayat-page',
    templateUrl: 'shekayat.html'
})
export class ShekayatPage {
    shekayatTitle: FormControl;
    shekayatText: FormControl;
    //------------------------------------------
    constructor(private toastCtrl: ToastController) {
        this.shekayatTitle = new FormControl('', Validators.required);
        this.shekayatText = new FormControl('', Validators.required);
    }
    //------------------------------------------
    save() {
        let toast = this.toastCtrl.create({
            message: 'شکایت شما ثبت و در اسرع وقت به آن رسیدگی خواهد شد',
            duration: 2000,
            cssClass: 'toastCss'
        });
        toast.present();
    }
}