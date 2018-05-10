import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about-us';

@NgModule({
    declarations: [AboutPage],
    imports: [IonicPageModule.forChild(AboutPage)],
    entryComponents: []
})
export class AboutPageModule { }