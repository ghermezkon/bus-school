import { Component } from "@angular/core";
import { IonicPage, NavController} from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { LoaderService } from "../../service/LoaderService";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
    selector: 'teacher-list',
    templateUrl: 'teacher-list.html',
})
export class TeacherListPage {
    teacher_list: Observable<Object>;
    input_search: any;
    //-------------------------------------------------------------------------------------------------------
    constructor(private navCtrl: NavController, private _loader: LoaderService,
        private _http: HttpService, private storage: Storage) { }
    //-------------------------------------------------------------------------------------------------------
    ionViewWillLoad() {
        this.storage.get('user').then((res: any)=>{
            this._loader.show().present().then(() => {
                this.teacher_list = this._http.getAllTeacher(res.study.study_name);
                this._loader.hide();
            });    
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