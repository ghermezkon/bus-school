import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherListPage } from './teacher-list';
import { PipesModule } from '../../pipes/pipes.module';
import { RatingModule } from '../../component/rating/rating.module';
@NgModule({
    declarations: [TeacherListPage],
    imports: [IonicPageModule.forChild(TeacherListPage), PipesModule, RatingModule],
})
export class TeacherListModule { }