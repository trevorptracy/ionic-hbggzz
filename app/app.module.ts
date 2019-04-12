import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//app pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PayInfoPage } from '../pages/pay-info/pay-info';
import { UsageInfoPage } from '../pages/usage-info/usage-info';
import { RegisterPage } from '../pages/register/register';
import { ScreensaverPage } from '../pages/screensaver/screensaver';
import { TariffInfoPage } from '../pages/tariff-info/tariff-info';
import { PaymentGraphsPage } from '../pages/payment-graphs/payment-graphs';
import { OnOffPeakPage } from '../pages/on-off-peak/on-off-peak';
import { ThenNowPage } from '../pages/then-now/then-now';
import { UsageOverTimePage } from '../pages/usage-over-time/usage-over-time';
import { ChangeLanguagePage } from '../pages/change-language/change-language';
import { ChangeLangLoginPage } from '../pages/change-lang-login/change-lang-login';

//add angular fire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule} from 'angularfire2/auth';

//add firebase key
import { FIREBASE_CONFIG } from './app.firebase.config';

//add translate module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    PayInfoPage,
    UsageInfoPage,
    RegisterPage,
    TariffInfoPage,
    PaymentGraphsPage,
    OnOffPeakPage,
    ThenNowPage,
    UsageOverTimePage,
    ScreensaverPage,
    ChangeLanguagePage,
    ChangeLangLoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    PayInfoPage,
    UsageInfoPage,
    RegisterPage,
    TariffInfoPage,
    PaymentGraphsPage,
    OnOffPeakPage,
    ThenNowPage,
    UsageOverTimePage,
    ScreensaverPage,
    ChangeLanguagePage,
    ChangeLangLoginPage
  ],
  providers: [
    StatusBar,
    AndroidFullScreen,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Keyboard
  ]
})
export class AppModule {}

