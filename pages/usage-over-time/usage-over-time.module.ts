import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsageOverTimePage } from './usage-over-time';

@NgModule({
  declarations: [
    UsageOverTimePage,
  ],
  imports: [
    IonicPageModule.forChild(UsageOverTimePage),
  ],
})
export class UsageOverTimePageModule {}
