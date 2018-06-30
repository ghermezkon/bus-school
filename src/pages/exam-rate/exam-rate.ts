import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController, ToastController } from "ionic-angular";
import { MessageService } from "../../util/message.service";
import { HttpService } from "../../service/HttpService";
import { LoaderService } from "../../service/LoaderService";

@IonicPage()
@Component({
    selector: 'exam-rate',
    templateUrl: 'exam-rate.html'
})
export class ExamRatePage {
    value: number = 0;
    exam_info: any;
    result_info: any;
    //-------------------------------------------------
    constructor(public navParams: NavParams, public navCtrl: NavController, public _msg: MessageService, public _http: HttpService, public _loader: LoaderService, public toastCtrl: ToastController) {
        this.exam_info = this.navParams.get('exam_info');
        this.result_info = this.navParams.get('result_info');
    }
    //-------------------------------------------------
    ratingComponetClick(value) {
        this.value = value;
    }
    showResult() {
        this._loader.show().present().then(() => {
            var data = {
                student_id: this._msg.inMemoryFindUser()._id,
                exam_id: this.exam_info.exam_id,
                teacher_code: this.exam_info.teacher_code,
                rank: +this.value
            }
            this._http.save_rank_for_exam(data).subscribe((res: any) => {
            })
            this._loader.hide();
        })
        this.navCtrl.push('CheckScorePage', { exam_info: this.result_info });
    }
}