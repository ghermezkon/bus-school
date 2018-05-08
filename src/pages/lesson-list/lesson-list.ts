import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular/navigation/ionic-page";
import { NavParams, NavController } from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { HomePage } from "../home/home";
import { MessageService } from "../../util/message.service";
import { Observable } from "rxjs";
//---------------------------------------------------------------------
@IonicPage()
@Component({
    selector: 'lesson-list',
    templateUrl: 'lesson-list.html'
})
export class LessonListPage {
    teacher_id: any;
    teacher_name: any;
    teacher_pic: any;
    lesson_list: Observable<Object>;
    //---------------------------------------------------------------------
    constructor(private _http: HttpService, public navParams: NavParams,
        public navCtrl: NavController, private _msg: MessageService) {
        this.getParams();
        if (this.teacher_name == undefined) {
            this.navCtrl.setRoot('HomePage')
        }
    }
    //---------------------------------------------------------------------
    ionViewWillLoad() {
        var res = this._msg.inMemoryFindUser();
        this.lesson_list = this._http.find_exam_lesson_by_teacher_name(this.teacher_name, res._id);
    }
    //---------------------------------------------------------------------
    getParams() {
        this.teacher_id = this.navParams.get('teacher_id');
        this.teacher_name = this.navParams.get('teacher_name');
        this.teacher_pic = this.navParams.get('teacher_pic');
    }
    //---------------------------------------------------------------------
    itemClick(event) {
        this.navCtrl.push('ExamListPage', {
            lesson_name: event._id.exam_lesson,
            teacher_name: this.teacher_name,
            teacher_pic: this.teacher_pic
        })
    }
}