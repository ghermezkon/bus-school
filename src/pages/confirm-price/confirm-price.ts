import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { MessageService } from '../../util/message.service';
import { AuthService } from '../../service/AuthService';
import { Platform } from 'ionic-angular/platform/platform';

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
  system_type: any;
  kharid_number: any = '';
  //-------------------------------------------------------------------------
  constructor(public navParams: NavParams, public navCtrl: NavController, public _msg: MessageService, public _auth: AuthService, public platform: Platform) { }
  //-------------------------------------------------------------------------
  ionViewWillLoad() {
    var os_type;
    if ((this.platform.is('core') || this.platform.is('mobileweb')) && (document.URL.startsWith('https') || document.URL.startsWith('http')))
      this.system_type = '_self';
    else this.system_type = '_blank';
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
    }
    if(this.system_type == '_self') os_type = 's'; else os_type = 'b';
    this.kharid_number = this.exam_info._id + '$' + this._msg.inMemoryFindUser()._id + os_type;
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
}
