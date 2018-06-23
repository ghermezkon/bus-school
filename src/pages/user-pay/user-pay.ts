import { IonicPage } from "ionic-angular";
import { Component } from "@angular/core";
import { HttpService } from "../../service/HttpService";
import { Observable } from "rxjs";
import { MessageService } from "../../util/message.service";

@IonicPage()
@Component({
    selector: 'user-pay',
    templateUrl: 'user-pay.html',
})
export class UserPayPage {
    pay_list: Observable<Object>;
    //------------------------------------------------------------
    constructor(public _http: HttpService, public _msg: MessageService) { }
    //------------------------------------------------------------
    ionViewWillLoad() {
        var res = this._msg.inMemoryFindUser();
        this.pay_list = this._http.find_user_payment(res._id);
    }
    //------------------------------------------------------------
}