import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { Observable } from "rxjs/Observable";
import { MessageService } from "../../util/message.service";
import { LoaderService } from "../../service/LoaderService";

@IonicPage()
@Component({
    selector: 'teacher-list',
    templateUrl: 'teacher-list.html',
})
export class TeacherListPage {
    teacher_list: Observable<Object>;
    input_search: any;
    //-------------------------------------------------------------------------------------------------------
    constructor(public navCtrl: NavController, public _msg: MessageService, public _http: HttpService, public _loader: LoaderService) { }
    //-------------------------------------------------------------------------------------------------------
    ionViewWillLoad() {
        this._loader.show().present().then(() => {
            var res = this._msg.inMemoryFindUser();
            this.teacher_list = this._http.getAllTeacher(res.study.study_name);
            this._loader.hide();
        })
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