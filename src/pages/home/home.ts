import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../service/AuthService';
import { MessageService } from '../../util/message.service';
import { Observable } from 'rxjs';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  landscape: any = false;
  folder?: undefined | null | string;
  profilePage: any = 'ProfilePage';
  teacherListPage: any = 'TeacherListPage';
  examRatePage: any = 'ExamRatePage';
  //-------------------------------------------
  isLoggedIn$: Observable<boolean>;
  //----------------------------------------------------------------------------------------
  constructor(public _auth: AuthService, public _msg: MessageService, public navCtrl: NavController) { }
  //----------------------------------------------------------------------------------------
  ionViewWillLoad() {
    this.isLoggedIn$ = this._auth.isLoggedIn$;    
    var res = this._msg.inMemoryFindUser();
    if (res == null || !res || res == undefined) {
      this.navCtrl.setRoot(LoginPage);
      this.navCtrl.popToRoot();
    } else {
      this.folder = res.user_sex.img.split('.')[0] + '-' + res.user_range.range_value;
    }
  }
  //----------------------------------------------------------------------------------------

}
