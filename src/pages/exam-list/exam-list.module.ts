import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamListPage } from './exam-list';
import { RatingModule } from '../../component/rating/rating.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [ExamListPage],
    imports: [IonicPageModule.forChild(ExamListPage), RatingModule, PipesModule],
})
export class ExamListModule { }