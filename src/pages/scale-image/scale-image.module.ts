import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScaleImageModal } from './scale-image';

@NgModule({
  declarations: [
    ScaleImageModal,
  ],
  imports: [
    IonicPageModule.forChild(ScaleImageModal),
  ],
})
export class ScaleImageModule {}
