import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatingModule } from '../../component/rating/rating.module';
import { ExamRatePage } from './exam-rate';

@NgModule({
    declarations: [ExamRatePage],
    imports: [IonicPageModule.forChild(ExamRatePage), RatingModule],
})
export class ExamRateModule { }