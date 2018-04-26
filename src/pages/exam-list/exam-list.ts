import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController, ModalController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../../service/HttpService";
import { LoaderService } from "../../service/LoaderService";
import { HomePage } from "../home/home";

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
    constructor(private _http: HttpService,private navCtrl: NavController, 
            private _loader: LoaderService, private navParams: NavParams, private modal: ModalController) {
        this.getParams();
        if(this.teacher_name == undefined){
            this.navCtrl.setRoot('HomePage');
        }
    }
    //---------------------------------------------------------
    ionViewWillLoad() {
        this._loader.show().present().then(() => {
            this.exam_list = this._http.find_exam_list_by_lesson_name(this.lesson_name, this.teacher_name);
            this._loader.hide();
        })
    }
    //---------------------------------------------------------
    getParams() {
        this.teacher_name = this.navParams.get('teacher_name');
        this.lesson_name = this.navParams.get('lesson_name');
        this.teacher_pic = this.navParams.get('teacher_pic');
    }
    //---------------------------------------------------------
    itemClick(event){
        let confirmPriceModal = this.modal.create('ConfirmPriceModal', 
            {exam_info: event, teacher_name: this.teacher_name, teacher_pic: this.teacher_pic, lesson_name: this.lesson_name});
        confirmPriceModal.present();
    }
}