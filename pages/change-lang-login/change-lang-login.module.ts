import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeLangLoginPage } from './change-lang-login';

@NgModule({
  declarations: [
    ChangeLangLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeLangLoginPage),
  ],
})
export class ChangeLangLoginPageModule {}
