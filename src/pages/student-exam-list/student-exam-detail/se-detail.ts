import { Component, ViewChild } from "@angular/core";
import { MessageService } from "../../../util/message.service";
import { HttpService } from "../../../service/HttpService";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { IonicPage, Slides } from "ionic-angular";

@IonicPage()
@Component({
    selector: 'SeDetail',
    templateUrl: 'se-detail.html'
})
export class SeDetailPage {
    exam_id: any;
    exam_name: any;
    exam: any;
    answers: any[] = [];
    currentIndex: number = -1;
    @ViewChild(Slides) slides: Slides;
    //-------------------------------------------
    constructor(private _msg: MessageService, private _http: HttpService, private navParams: NavParams) {
        this.exam_id = this.navParams.get('exam_id');
        this.exam_name = this.navParams.get('exam_name');
    }
    //-------------------------------------------
    ionViewWillLoad() {
        this.slides.lockSwipes(true);
        this._http.find_student_exam_detail(this.exam_id, '123654').take(1).subscribe((res: any) => {
            this.exam = res[0].exam_questions;
            for(let i = 0; i < this.exam.length; i++){
                this.answers[i] = this.exam[i].answer_fine;
            }
        })
    }
    //-------------------------------------------
    slideChanged() {
        this.currentIndex = this.slides.getActiveIndex();
    }
    //-------------------------------------------
    slideNext() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(this.slides.getActiveIndex() + 1);
        this.slides.lockSwipes(true);
    }
    //-------------------------------------------
    slidePrev() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(this.slides.getActiveIndex() - 1);
        this.slides.lockSwipes(true);
    }
    //-------------------------------------------
}