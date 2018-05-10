import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  platform: any;
  @ViewChild(Nav) nav: Nav;
  //--------------------------------------------------
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard,
    public app: App, public alertCtrl: AlertController) {
    this.platform = platform;
    platform.ready().then(() => {
      keyboard.disableScroll(true);
      statusBar.styleDefault();
      splashScreen.hide();
      platform.registerBackButtonAction((e) => {
        let nav = this.app.getActiveNavs()[0];
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          let actionSheet = this.alertCtrl.create({
            title: '<h3 class="fluid">برای خروج از برنامه مطمئن هستید؟</h3>',
            buttons: [
              {
                text: 'خیر',
                role: 'cancel',
              },
              {
                text: 'بله',
                handler: () => {
                  platform.exitApp();
                }
              }
            ]
          });
          actionSheet.present();
        }
      });
    });
  }
  exitApp() {
    this.platform.exitApp();
  }
  gotToStudentExamList(){
    this.nav.push('SePage');
  }
  goToRule(){
    this.nav.push('RulePage');
  }
  goToContactUs(){
    this.nav.push('ContactUsPage');
  }
  goToAbout(){
    this.nav.push('AboutPage');
  }
  goToShekayat(){
    this.nav.push('ShekayatPage');
  }
}
