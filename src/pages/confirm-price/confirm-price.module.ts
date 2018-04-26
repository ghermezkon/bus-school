import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPriceModal } from './confirm-price';

@NgModule({
  declarations: [
    ConfirmPriceModal,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPriceModal),
  ],
})
export class ModalPageModule {}
