import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { PersianDatePipe, ToShamsiPersianDatePipe } from './date/persianDate';
import { FormatTimePipe } from './timer/timer';
@NgModule({
	declarations: [FilterPipe, PersianDatePipe, FormatTimePipe, ToShamsiPersianDatePipe],
	imports: [],
	exports: [FilterPipe, PersianDatePipe, FormatTimePipe, ToShamsiPersianDatePipe]
})
export class PipesModule { }
