import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../service/HttpService";
import { MessageService } from "../../util/message.service";
import { Observable } from "rxjs/Observable";
import { LoaderService } from "../../service/LoaderService";

@IonicPage()
@Component({
    selector: 'SePage',
    templateUrl: 'se.html'
})
export class SePage {
    exam_list: Observable<Object>;
    //----------------------------------------------------
    constructor(public _msg: MessageService, public _http: HttpService, public navCtrl: NavController, public _loader: LoaderService) { }
    //----------------------------------------------------
    ionViewWillLoad() {
        this._loader.show().present().then(() => {
            var res = this._msg.inMemoryFindUser();
            this.exam_list = this._http.find_student_exam_list(res._id);
            this._loader.hide();
        });
    }
    //----------------------------------------------------
    itemClick(data) {
        this.navCtrl.push('SeDetailPage', { exam_id: data._id, exam_name: data.exam_name });
    }
}