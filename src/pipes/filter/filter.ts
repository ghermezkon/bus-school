import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.teacher_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}