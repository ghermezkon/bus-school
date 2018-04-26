import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../service/AuthService';
import { Storage } from '@ionic/storage';

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
  constructor(private navCtrl: NavController, private storage: Storage,private navParam: NavParams,
    private authService: AuthService) {}
  //----------------------------------------------------------------------------------------
  ionViewWillLoad(){
    if(this.navParam.get('folder')) this.folder = this.navParam.get('folder');
    else{
      this.storage.get('user').then((res: any) => {
        this.folder = res.user_sex.img.split('.')[0] + '-' + res.user_range.range_value;
      });  
    }
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  //----------------------------------------------------------------------------------------
}