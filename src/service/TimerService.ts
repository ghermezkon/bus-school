import { Injectable } from "@angular/core";
import { timer } from "rxjs";
import { take, map } from "rxjs/operators";
import { DoExamPageModule } from "../pages/do-exam/do-exam.module";

@Injectable({
    providedIn: DoExamPageModule,
})
export class TimerService {
    tick = 1000;
    //----------------------------------------------------------------------------
    getCounter(counter) {
        return timer(0, this.tick).pipe(take(counter), map(() => --counter))
    }
    //----------------------------------------------------------------------------
}