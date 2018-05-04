import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../service/AuthService';
import { MessageService } from '../../util/message.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  landscape: any = false;
  folder: any;
  profilePage: any = 'ProfilePage';
  teacherListPage: any = 'TeacherListPage';
  //-------------------------------------------
  isLoggedIn$: Observable<boolean>;
  //----------------------------------------------------------------------------------------
  constructor(private navCtrl: NavController, private navParam: NavParams,
    private authService: AuthService, private _msg: MessageService, private menuCtrl: MenuController) {}
  //----------------------------------------------------------------------------------------
  ionViewWillLoad() {
    var res = this._msg.inMemoryFindUser();
    this.folder = res.user_sex.img.split('.')[0] + '-' + res.user_range.range_value;
    // if(this.navParam.get('folder')) this.folder = this.navParam.get('folder');
    // else{
    //   var res = this._msg.inMemoryFindUser();
    //   this.folder = res.user_sex.img.split('.')[0] + '-' + res.user_range.range_value;
    // }
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  //----------------------------------------------------------------------------------------
}
