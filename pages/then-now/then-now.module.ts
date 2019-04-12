import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThenNowPage } from './then-now';

@NgModule({
  declarations: [
    ThenNowPage,
  ],
  imports: [
    IonicPageModule.forChild(ThenNowPage),
  ],
})
export class ThenNowPageModule {}
