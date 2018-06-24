import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    loader: any;
    constructor(public loadingCtrl: LoadingController) { }
    //-------------------------------------------------------------------
    public show() {
        let loader = this.loadingCtrl.create({
            content: `<img src="assets/imgs/loading-2.svg" height="100"/>`,
            spinner: 'hide', cssClass: 'my-svg-loading',
        })
        this.loader = loader;
        return loader;
    }
    public hide() {
        setTimeout(() => {
            this.loader.dismiss();
        }, 200);
    }
}