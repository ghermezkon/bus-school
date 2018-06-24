import { Pipe, PipeTransform } from '@angular/core';
import { PersianCalendar } from '../../service/persian.calendar';
@Pipe({
    name: 'datePipe',
})
export class PersianDatePipe implements PipeTransform {
    transform(value: any) {
        return value.toString().substring(0, 4) + '/' + value.toString().substring(4, 6) + '/' + value.toString().substring(6, 8);
    }
}

@Pipe({
    name: 'toShamsiDatePipe',
})
export class ToShamsiPersianDatePipe implements PipeTransform {
    constructor(public pc: PersianCalendar){}
    transform(value: any) {
        var shamsi = this.pc.PersianCalendar(new Date(value));
        return shamsi;
    }
}