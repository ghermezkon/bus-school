import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService } from '../../service/AuthService';
import { MessageService } from '../../util/message.service';
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular/platform/platform';

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
  constructor(private authService: AuthService, private _msg: MessageService) { }
  //----------------------------------------------------------------------------------------
  ionViewWillLoad() {
    var res = this._msg.inMemoryFindUser();
    this.folder = res.user_sex.img.split('.')[0] + '-' + res.user_range.range_value;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  //----------------------------------------------------------------------------------------

}
