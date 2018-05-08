import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController, ModalController } from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { HomePage } from "../home/home";
import { MessageService } from "../../util/message.service";
import { Observable } from "rxjs";

@IonicPage()
@Component({
    selector: 'exam-list',
    templateUrl: 'exam-list.html'
})
export class ExamListPage {
    exam_list: Observable<Object>;
    teacher_name: string;
    teacher_pic: any;
    lesson_name: string;
    //---------------------------------------------------------
    constructor(private _http: HttpService, public navCtrl: NavController, private _msg: MessageService,
        public navParams: NavParams, public modal: ModalController) {
        this.getParams();
        if (this.teacher_name == undefined) {
            this.navCtrl.setRoot('HomePage');
        }
    }
    //---------------------------------------------------------
    ionViewWillLoad() {
        var res = this._msg.inMemoryFindUser();
        this.exam_list = this._http.find_exam_list_by_lesson_name(this.lesson_name, this.teacher_name, res._id);
    }
    //---------------------------------------------------------
    getParams() {
        this.teacher_name = this.navParams.get('teacher_name');
        this.lesson_name = this.navParams.get('lesson_name');
        this.teacher_pic = this.navParams.get('teacher_pic');
    }
    //---------------------------------------------------------
    itemClick(event) {
        this.navCtrl.push('ConfirmPriceModal', { exam_info: event, teacher_name: this.teacher_name, teacher_pic: this.teacher_pic, lesson_name: this.lesson_name });
    }
}