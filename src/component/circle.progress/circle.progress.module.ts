import { NgModule } from '@angular/core';
import { RoundProgressComponent } from './circle.progress';
import { RoundProgressService } from './round-progress.service';
import { RoundProgressEase } from './round-progress.ease';
import { RoundProgressConfig } from './round-progress.config';
@NgModule({
	declarations: [RoundProgressComponent],
	imports: [],
	exports: [RoundProgressComponent],
	providers: [RoundProgressService, RoundProgressEase, RoundProgressConfig]
})
export class CircleProgressModule {}
