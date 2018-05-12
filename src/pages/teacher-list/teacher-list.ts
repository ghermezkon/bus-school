import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { Observable } from "rxjs/Observable";
import { MessageService } from "../../util/message.service";

@IonicPage()
@Component({
    selector: 'teacher-list',
    templateUrl: 'teacher-list.html',
})
export class TeacherListPage {
    teacher_list: Observable<Object>;
    input_search: any;
    //-------------------------------------------------------------------------------------------------------
    constructor(public navCtrl: NavController, private _msg: MessageService, private _http: HttpService) { }
    //-------------------------------------------------------------------------------------------------------
    ionViewWillLoad() {
        var res = this._msg.inMemoryFindUser();
        this.teacher_list = this._http.getAllTeacher(res.study.study_name);

    }
    //-------------------------------------------------------------------------------------------------------
    itemClick(event) {
        this.navCtrl.push('LessonListPage', {
            teacher_id: event._id,
            teacher_name: event.teacher_name,
            teacher_pic: event.teacher_pic
        });
    }
    //-------------------------------------------------------------------------------------------------------
}