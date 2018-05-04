import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';

@IonicPage()
@Component({
    selector: 'check-score',
    templateUrl: 'check-score.html'
})
export class CheckScorePage {
    current: number = 0; max: number = 100;
    exam_info: any; condition: any = 'empty';
    user_score: number = 0; exam_score: number = 0;
    //------------------------------------------------
    constructor(public navParams: NavParams, public navCtrl: NavController) {
        this.exam_info = this.navParams.get('exam_info');
    }
    //------------------------------------------------
    ionViewDidLoad() {
        let progressBar = Observable.interval(10).subscribe(res => {
            this.current = res + 1;
            if (this.current >= 100) {
                this.user_score = this.exam_info.user_score;
                this.exam_score = this.exam_info.exam_score;
                if (this.exam_info.user_score == this.exam_info.exam_score)
                    this.condition = 'success';
                else if ((this.exam_info.user_score < this.exam_info.exam_score) &&
                    (this.exam_info.user_score >= this.exam_info.exam_score / 3))
                    this.condition = 'middle';
                else if ((this.exam_info.user_score < this.exam_info.exam_score / 3) || this.exam_info.user_score == 0)
                    this.condition = 'lose';                
                progressBar.unsubscribe();
            }
        });
    }
    backToHome() {
        this.navCtrl.setRoot('HomePage');
        this.navCtrl.popToRoot();
    }
}