import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'datePipe',
})
export class PersianDatePipe implements PipeTransform {
    transform(value: any) {
        return value.toString().substring(0, 4) + '/' + value.toString().substring(4, 6) + '/' + value.toString().substring(6, 8);
    }
}