import { Component } from '@angular/core';
import { Platform, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  //--------------------------------------------------
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard,
    public app: App, private alertCtrl: AlertController) {
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
}
