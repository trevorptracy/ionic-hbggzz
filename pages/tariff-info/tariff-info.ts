import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the TariffInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
///////

@Component({
  selector: 'page-tariff-info',
  templateUrl: 'tariff-info.html',
})
export class TariffInfoPage {

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

    // //check if a user is logged in before entering the page
  // async ionViewCanEnter(): Promise<boolean> {
  //   try {
  //     await this.afAuth.auth.currentUser.email;
  //   } 
  //   catch (err){
  //     console.log('NO USER. REDIRECT.');
    
  //     setTimeout(() => {
  //       this.navCtrl.push(LoginPage); //if no user, reidrect to LoginPage
  //     })
  //     return false;
  //   }
  //   return true;
  // }
  /////////////////////////

  ionViewDidLoad() {
    console.log('ionViewDidLoad TariffInfoPage');
  }

      //function for logout button
      logOut() {
        this.afAuth.auth.signOut();
        console.log('Logged out');
        this.navCtrl.push(LoginPage)
      }

}
