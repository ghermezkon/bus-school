import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPayPage } from './user-pay';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
    declarations: [UserPayPage],
    imports: [IonicPageModule.forChild(UserPayPage), PipesModule],
})
export class UserPayPageModule { }