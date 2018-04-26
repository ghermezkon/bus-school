import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/do'

@Injectable()
export class TimerService {
    tick = 1000;
    //----------------------------------------------------------------------------
    getCounter(counter) {
        return Observable.timer(0, this.tick).take(counter).map(() => --counter)
    }
    //----------------------------------------------------------------------------
}