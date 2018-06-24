import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController, ModalController } from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { MessageService } from "../../util/message.service";
import { Observable } from "rxjs";
import { LoaderService } from "../../service/LoaderService";

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
    teacher_id: string;
    //---------------------------------------------------------
    constructor(public _http: HttpService, public navCtrl: NavController, public _msg: MessageService,
        public navParams: NavParams, public modal: ModalController, public _loader: LoaderService) {
        this.getParams();
        if (this.teacher_name == undefined) {
            this.navCtrl.setRoot('HomePage');
        }
    }
    //---------------------------------------------------------
    ionViewWillLoad() {
        this._loader.show().present().then(() => {
            var res = this._msg.inMemoryFindUser();
            this.exam_list = this._http.find_exam_list_by_lesson_name(this.lesson_name, this.teacher_name, res._id);
            this._loader.hide();
        })
    }
    //---------------------------------------------------------
    getParams() {
        this.teacher_name = this.navParams.get('teacher_name');
        this.lesson_name = this.navParams.get('lesson_name');
        this.teacher_pic = this.navParams.get('teacher_pic');
        this.teacher_id = this.navParams.get('teacher_id');
    }
    //---------------------------------------------------------
    itemClick(event) {
        this.navCtrl.push('ConfirmPriceModal', { exam_info: event, teacher_name: this.teacher_name, teacher_pic: this.teacher_pic, teacher_id: this.teacher_id, lesson_name: this.lesson_name });
    }
}