import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController } from 'ionic-angular';

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
  //-------------------------------------------------------------------------
  constructor(public navParams: NavParams, public navCtrl: NavController, public viewCtrl: ViewController) { }
  //-------------------------------------------------------------------------
  ionViewWillLoad() {
    this.exam_info = this.navParams.get('exam_info');
    this.teacher_name = this.navParams.get('teacher_name');
    this.teacher_pic = this.navParams.get('teacher_pic');
    this.lesson_name = this.navParams.get('lesson_name');
  }
  //-------------------------------------------------------------------------
  // closeModal() {
  //   this.viewCtrl.dismiss();
  // }
  //-------------------------------------------------------------------------
  doExam() {
    this.navCtrl.push('DoExamPage', { exam_info: this.exam_info });
  }
}
