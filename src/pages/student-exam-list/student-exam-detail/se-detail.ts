import { Component, ViewChild } from "@angular/core";
import { MessageService } from "../../../util/message.service";
import { HttpService } from "../../../service/HttpService";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { IonicPage, Slides } from "ionic-angular";
import { take } from "rxjs/operators";

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
    user_answer: any[] = [];
    currentIndex: number = -1;
    @ViewChild(Slides) slides: Slides;
    //-------------------------------------------
    constructor(public _msg: MessageService, public _http: HttpService, public navParams: NavParams) {
        this.exam_id = this.navParams.get('exam_id');
        this.exam_name = this.navParams.get('exam_name');
    }
    //-------------------------------------------
    ionViewWillLoad() {
        var user_res = this._msg.inMemoryFindUser();
        this.slides.lockSwipes(true);
        this._http.find_student_exam_detail(this.exam_id, user_res._id).pipe(take(1)).subscribe((res: any) => {
            this.exam = res[0].exam_questions;
            for (let i = 0; i < this.exam.length; i++) {
                this.answers[i] = this.exam[i].answer_fine;
            }
            for (let i = 0; i < res[0].result_exam[0].result.length; i++) {
                if (res[0].result_exam[0].result[i].user_answer == 1)
                    this.user_answer[i] = 'الف';
                else if (res[0].result_exam[0].result[i].user_answer == 2)
                    this.user_answer[i] = 'ب';
                else if (res[0].result_exam[0].result[i].user_answer == 3)
                    this.user_answer[i] = 'ج';
                else if (res[0].result_exam[0].result[i].user_answer == 4)
                    this.user_answer[i] = 'دال';
                else
                this.user_answer[i] = 'اشتباه (بدون انتخاب)';

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