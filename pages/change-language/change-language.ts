import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ChangeLanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-language',
  templateUrl: 'change-language.html',
})
export class ChangeLanguagePage {
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
  }

}
