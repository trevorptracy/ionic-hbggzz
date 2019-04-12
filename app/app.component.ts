import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import {TranslateService} from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { ChangeLangLoginPage } from '../pages/change-lang-login/change-lang-login';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //change rootPage to the first page in the app
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    translate: TranslateService, androidFullScreen: AndroidFullScreen) {
    

    translate.setDefaultLang('hc');
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

