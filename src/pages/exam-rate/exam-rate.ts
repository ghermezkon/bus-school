import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";

@IonicPage()
@Component({
    selector: 'exam-rate',
    templateUrl: 'exam-rate.html'
})
export class ExamRatePage {
    value: number = 0;
    exam_info: any;
    //-------------------------------------------------
    constructor(public navParams: NavParams, public navCtrl: NavController, ) {
        this.exam_info = this.navParams.get('exam_info');
    }
    //-------------------------------------------------
    ratingComponetClick(value) {
        this.value = value;
    }
    showResult(){
        this.navCtrl.push('CheckScorePage', { exam_info: this.exam_info });
    }
}