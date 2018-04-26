import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { PersianDatePipe } from './date/persianDate';
import { FormatTimePipe } from './timer/timer';
@NgModule({
	declarations: [FilterPipe, PersianDatePipe, FormatTimePipe],
	imports: [],
	exports: [FilterPipe, PersianDatePipe, FormatTimePipe]
})
export class PipesModule { }
