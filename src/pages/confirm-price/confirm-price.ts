import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, Events } from 'ionic-angular';
import { MessageService } from '../../util/message.service';
import { AuthService } from '../../service/AuthService';
import { Platform } from 'ionic-angular/platform/platform';
import { HttpService } from '../../service/HttpService';
import { take } from 'rxjs/operators';

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
  isPayment: boolean = false;
  transaction_flag: boolean = false;
  kharid_number: any = '';
  os_type;
  //-------------------------------------------------------------------------
  constructor(public navParams: NavParams, public navCtrl: NavController, public events: Events,
    public _http: HttpService,
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
      this.lesson_name = this.navParams.get('lesson_name');
      localStorage.clear();
    } else {
      this._auth.token = localStorage.getItem('token');
      this.exam_info = JSON.parse(localStorage.getItem('exam_info'));
      this.teacher_name = localStorage.getItem('teacher_name');
      this.teacher_pic = localStorage.getItem('teacher_pic');
      this.lesson_name = localStorage.getItem('lesson_name');
      this.isPayment = true;
      this._auth.sendLoginStatus(true);
    }
    this.kharid_number = this.exam_info._id + '$' + this._msg.inMemoryFindUser()._id + this.os_type;
  }
  //-------------------------------------------------------------------------
  doExam() {
    this.navCtrl.push('DoExamPage', { exam_info: this.exam_info });
  }
  //-------------------------------------------------------------------------
  onSubmit(form: any, e: any) {
    localStorage.setItem('token', this._auth.token);
    localStorage.setItem('user', JSON.stringify(this._msg.inMemoryFindUser()));
    localStorage.setItem('exam_info', JSON.stringify(this.exam_info));
    localStorage.setItem('teacher_name', this.teacher_name);
    localStorage.setItem('teacher_pic', this.teacher_pic);
    localStorage.setItem('lesson_name', this.lesson_name);
    e.target.submit()
  }
  //-------------------------------------------------------------------------
  checkConfirm() {
    this._http.checkPayment(this.kharid_number).pipe(take(1)).subscribe((res: any) => {
      if (res && res.length > 0) {

      } else {
        this.transaction_flag = true;
      }
    })
  }
  backToHome() {
    this.kharid_number = '';
    this.isPayment = false;
    this.transaction_flag = false;
    this.events.publish('user:login', this._msg.inMemoryFindUser());
    this.navCtrl.setRoot('HomePage');
    this.navCtrl.popToRoot();
  }
}
