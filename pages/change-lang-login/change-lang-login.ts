import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChangeLangLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-lang-login',
  templateUrl: 'change-lang-login.html',
})
export class ChangeLangLoginPage {
  lang:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLanguagePage');
  }

  hcLang(){
    this.lang='hc';
    this.switchLanguage();
  }

  enLang(){
    this.lang='en';
    this.switchLanguage();
  }

  frLang(){
    this.lang='fr';
    this.switchLanguage();
  }

  switchLanguage() {
    this.translate.use(this.lang);
    this.navCtrl.push(LoginPage);
  }

}
