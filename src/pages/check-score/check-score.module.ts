import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CircleProgressModule } from '../../component/circle.progress/circle.progress.module';
import { CheckScorePage } from './check-score';

@NgModule({
    declarations: [CheckScorePage],
    imports: [ IonicPageModule.forChild(CheckScorePage), CircleProgressModule],
})
export class CheckScoreModule { }