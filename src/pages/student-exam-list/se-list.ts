import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { MessageService } from "../../util/message.service";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
    selector: 'SePage',
    templateUrl: 'se.html'
})
export class SePage {
    exam_list: Observable<Object>;
    //----------------------------------------------------
    constructor(private _msg: MessageService, private _http: HttpService, private navCtrl: NavController) { }
    //----------------------------------------------------
    ionViewWillLoad() {
        var res = this._msg.inMemoryFindUser();
        this.exam_list = this._http.find_student_exam_list(res._id);
    }
    //----------------------------------------------------
    itemClick(data) {
        this.navCtrl.push('SeDetailPage', { exam_id: data._id, exam_name: data.exam_name });
    }
}