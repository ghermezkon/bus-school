import { Component, ViewChild } from "@angular/core";
import { IonicPage, Slides, ModalController, NavParams, NavController, ToastController } from "ionic-angular";
import { TimerService } from "../../service/TimerService";
import { HttpService } from "../../service/HttpService";
import { MessageService } from "../../util/message.service";
import { interval } from "rxjs";
import { take, tap } from "rxjs/operators";

@IonicPage()
@Component({
    selector: 'doExamPage',
    templateUrl: 'do-exam.html'
})
export class DoExamPage {
    scaleImage: any;
    exam_info: any;
    exam: any;
    answers: any[] = [];
    saveAnswer: any;
    //------------------------------------------------------
    @ViewChild(Slides) slides: Slides;
    //------------------------------------------------------
    currentIndex: number = -1;
    //------------------------------------------------------
    countDown;
    startCounter: number = 10;
    counter: number = 10
    progressWidth: any = 0;
    current = 5; max = 100;
    //------------------------------------------------------
    constructor(public timerService: TimerService, public _http: HttpService, public _msg: MessageService,
        public navCtrl: NavController,
        public navParams: NavParams, public modal: ModalController, public toastCtrl: ToastController) { }
    //------------------------------------------------------
    ionViewWillLoad() {
        this.slides.lockSwipes(true);
        this.exam_info = this.navParams.get('exam_info');
        this.counter = this.startCounter = +this.exam_info.exam_time;

        this._http.find_exam_by_id(this.exam_info._id).pipe(take(1)).subscribe((res: any) => {
            this.exam = res[0].exam_questions;
        })

        this.countDown = this.timerService.getCounter(this.startCounter).pipe(tap(() => --this.counter));
        //****************************************************** */
        let progressBar = interval(950).subscribe(res => {
            res++;
            this.progressWidth = Math.floor((res / this.startCounter) * 100);
            if (this.progressWidth >= 100) {
                progressBar.unsubscribe();
            }
        });
        //***************************************************** */
    }
    //------------------------------------------------------
    slideChanged() {
        this.currentIndex = this.slides.getActiveIndex();
    }
    //------------------------------------------------------
    slideNext() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(this.slides.getActiveIndex() + 1);
        this.slides.lockSwipes(true);
    }
    slidePrev() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(this.slides.getActiveIndex() - 1);
        this.slides.lockSwipes(true);
    }
    //------------------------------------------------------
    imageClick(value) {
        let scaleImageModal = this.modal.create('ScaleImageModal', { scale_image: value });
        scaleImageModal.present();
    }
    //------------------------------------------------------
    endExam() {
        var final: any[] = [];
        var pattern = { question_number: 0, user_answer: 0, answer_fine: 0 };
        var sumScore = 0;
        var exam_score = 0;
        var save_info: any = {};
        var score: any[] = [];
        this._http.find_score_by_exam_id(this.exam_info._id).pipe(take(1)).subscribe((res: any) => {
            score = res[0].exam_questions;
            if (this.answers.length == 0) {
                for (let i = 0; i < score.length; i++) {
                    this.answers[i] = -1;
                }
            }
            for (let i = 0; i < this.answers.length; i++) {
                pattern = { question_number: +score[i].question_number, user_answer: +this.answers[i], answer_fine: +score[i].answer_fine }

                if (+this.answers[i] == +score[i].answer_fine) {
                    sumScore += +score[i].question_grade;
                }
                exam_score += +score[i].question_grade;
                final.push(pattern);
            }
            save_info['exam_id'] = this.exam_info._id;
            save_info['final'] = final;
            save_info['user_score'] = sumScore;
            save_info['exam_score'] = exam_score;
            var user = this._msg.inMemoryFindUser();
            var result = { student_id: user._id, exam_id: this.exam_info._id, result: final, exam_score: exam_score, user_score: sumScore };
            //this.navCtrl.push('CheckScorePage', { exam_info: save_info });
            this._http.update_result_exam(result).pipe(take(1)).subscribe((data: any) => {
                console.log(data);
                if (data.ok == 1 && data.n >= 1) {
                    this.navCtrl.push('CheckScorePage', { exam_info: save_info });
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'ارتباط با سرور قطع گردید',
                        duration: 2000,
                        cssClass: 'toastCss'
                    });
                    toast.present();
                }
            });
        })
    }
}