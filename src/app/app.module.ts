import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../service/loader.interceptor';

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
      monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      animate: false,
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  exports: [],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ]
})
export class AppModule { }
