import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'scale-image.html',
})
export class ScaleImageModal {
  scale_image: any;
  //-------------------------------------------------------------------------
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {}
  //-------------------------------------------------------------------------
  ionViewWillLoad(){
    this.scale_image = this.navParams.get('scale_image');
  }
  //-------------------------------------------------------------------------
  closeModal(){
    this.viewCtrl.dismiss();
  }
  //-------------------------------------------------------------------------
}
