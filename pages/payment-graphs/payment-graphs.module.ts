import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentGraphsPage } from './payment-graphs';

@NgModule({
  declarations: [
    PaymentGraphsPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentGraphsPage),
  ],
})
export class PaymentGraphsPageModule {}
