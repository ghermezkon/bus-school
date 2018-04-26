import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoExamPage } from './do-exam';
import { PipesModule } from '../../pipes/pipes.module';
import { TimerService } from '../../service/TimerService';
import { PersianCalendar } from '../../service/persian.calendar';

@NgModule({
    declarations: [DoExamPage],
    imports: [ IonicPageModule.forChild(DoExamPage), PipesModule],
    providers:[TimerService, PersianCalendar]
})
export class DoExamPageModule { }