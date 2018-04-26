import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'scale-image.html',
})
export class ScaleImageModal {
  scale_image: any;
  //-------------------------------------------------------------------------
  constructor(private navParams: NavParams, private viewCtrl: ViewController) {}
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
