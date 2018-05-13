import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShekayatPage } from './shekayat';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

@NgModule({
    declarations: [ShekayatPage],
    imports: [RecaptchaModule.forRoot(), IonicPageModule.forChild(ShekayatPage)],
    entryComponents: [],
    providers: [
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'fa', // use French language
        },
    ]
})
export class ShekayatPageModule { }