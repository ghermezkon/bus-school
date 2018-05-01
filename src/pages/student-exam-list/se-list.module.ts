import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatingModule } from '../../component/rating/rating.module';
import { SePage } from './se-list';
@NgModule({
    declarations: [SePage],
    imports: [IonicPageModule.forChild(SePage), RatingModule],
    entryComponents: []
})
export class SeModule { }