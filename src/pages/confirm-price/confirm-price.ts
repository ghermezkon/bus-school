import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, Events, ToastController } from 'ionic-angular';
import { MessageService } from '../../util/message.service';
import { AuthService } from '../../service/AuthService';
import { Platform } from 'ionic-angular/platform/platform';
import { HttpService } from '../../service/HttpService';
import { take } from 'rxjs/operators';
import { LoaderService } from '../../service/LoaderService';

@IonicPage()
@Component({
  selector: 'confirm-price',
  templateUrl: 'confirm-price.html',
})
export class ConfirmPriceModal {
  exam_info: any;
  teacher_name: any;
  teacher_pic: any;
  lesson_name: any;
  teacher_id: string;
  isPayment: boolean = false;
  transaction_flag: boolean = false;
  start_exam: boolean = false;
  kharid_number: any = '';
  os_type;
  //-------------------------------------------------------------------------
  constructor(public navParams: NavParams, public navCtrl: NavController, public events: Events,
    public _http: HttpService, public toastCtrl: ToastController, public _loader: LoaderService,
    public _msg: MessageService, public _auth: AuthService, public platform: Platform) { }
  //-------------------------------------------------------------------------
  ionViewWillLoad() {
    if ((this.platform.is('core') || this.platform.is('mobileweb')) && (document.URL.startsWith('https') || document.URL.startsWith('http'))) {
      this.os_type = 's';
    }
    else { this.os_type = 'b'; }
    //--------
    if (this.navParams.get('exam_info')) {
      this.isPayment = false;
      this.exam_info = this.navParams.get('exam_info');
      this.teacher_name = this.navParams.get('teacher_name');
      this.teacher_pic = this.navParams.get('teacher_pic');
      this.teacher_id = this.navParams.get('teacher_id');
      this.lesson_name = this.navParams.get('lesson_name');
      localStorage.clear();
    } else {
      this._auth.token = localStorage.getItem('token');
      this.exam_info = JSON.parse(localStorage.getItem('exam_info'));
      this.teacher_name = localStorage.getItem('teacher_name');
      this.teacher_pic = localStorage.getItem('teacher_pic');
      this.teacher_id = localStorage.getItem('teacher_id');
      this.lesson_name = localStorage.getItem('lesson_name');
      this.isPayment = true;
      this._auth.sendLoginStatus(true);
    }
    this.kharid_number = this.exam_info._id + '$' + this._msg.inMemoryFindUser()._id + this.os_type;
  }
  //-------------------------------------------------------------------------
  onSubmit(form: any, e: any) {
    localStorage.setItem('token', this._auth.token);
    localStorage.setItem('user', JSON.stringify(this._msg.inMemoryFindUser()));
    localStorage.setItem('exam_info', JSON.stringify(this.exam_info));
    localStorage.setItem('teacher_name', this.teacher_name);
    localStorage.setItem('teacher_pic', this.teacher_pic);
    localStorage.setItem('teacher_id', this.teacher_id);
    localStorage.setItem('lesson_name', this.lesson_name);
    e.target.submit();
  }
  //-------------------------------------------------------------------------
  checkConfirm() {
    var final: any[] = [];
    var answers: any[] = [];
    var pattern = { question_number: 0, user_answer: 0, answer_fine: 0 };
    var sumScore = 0;
    var exam_score = 0;
    var save_info: any = {};
    var score: any[] = [];

    var new_kharid_number = this.kharid_number.slice(0, 49);
    var student_id = new_kharid_number.slice(25, 49);
    var exam_id = new_kharid_number.slice(0, 24);
    this._loader.show().present().then(() => {
      this._http.checkPayment(new_kharid_number).pipe(take(1)).subscribe((res: any) => {
        if (res && res.length > 0) {
          this._http.find_score_by_exam_id(this.exam_info._id).pipe(take(1)).subscribe((res: any) => {
            score = res[0].exam_questions;
            if (answers.length == 0) {
              for (let i = 0; i < score.length; i++) {
                answers[i] = -1;
              }
            }
            for (let i = 0; i < answers.length; i++) {
              pattern = { question_number: +score[i].question_number, user_answer: +answers[i], answer_fine: +score[i].answer_fine }

              if (+answers[i] == +score[i].answer_fine) {
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
            this._http.save_result_exam(result).pipe(take(1)).subscribe((data: any) => {
              if (data.ok == 1 && data.n >= 1) {
                this._http.checkTeacherPayment(new_kharid_number, this.teacher_id).pipe(take(1)).subscribe((teacher: any) => {
                  if (teacher == 0) {
                    var data = {
                      teacher_code: this.teacher_id, kharid_number: new_kharid_number,
                      student_id: student_id, exam_id: exam_id, kharid_date: new Date(), checkout_date: null
                    };
                    this._http.save_payment_for_teacher(data).pipe(take(1)).subscribe((newRes: any) => {
                      if (newRes.n >= 1) {
                        this.start_exam = true;
                        this.isPayment = false;
                        this.transaction_flag = false;
                        this.kharid_number = '';
                      } else {
                        this.transaction_flag = true;
                      }
                    })
                  }
                })
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
        } else {//invalid transaction
          this.transaction_flag = true;
        }
        this._loader.hide();
      })
    })//end Loader

  }
  backToHome() {
    this.kharid_number = '';
    this.isPayment = false;
    this.transaction_flag = false;
    this.events.publish('user:login', this._msg.inMemoryFindUser());
    this.navCtrl.setRoot('HomePage');
    this.navCtrl.popToRoot();
  }
  //-------------------------------------------------------------------------
  doExam() {
    this.navCtrl.push('DoExamPage', { exam_info: this.exam_info });
  }
}
