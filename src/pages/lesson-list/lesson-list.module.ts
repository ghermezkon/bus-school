import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonListPage } from './lesson-list';
@NgModule({
    declarations: [LessonListPage],
    imports: [IonicPageModule.forChild(LessonListPage)],
})
export class LessonListModule { }