import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MessageService } from '../util/message.service';
import { LoaderService } from '../service/LoaderService';
import { HttpService } from '../service/HttpService';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../service/AuthService';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/forkJoin';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'بازگشت',
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند' ],
      animate:false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  exports:[],
  providers: [
    MessageService,
    LoaderService,
    HttpService,
    AuthService, 
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
