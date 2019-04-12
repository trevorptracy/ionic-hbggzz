import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the OnOffPeakPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-on-off-peak',
  templateUrl: 'on-off-peak.html',
})
export class OnOffPeakPage {

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
    console.log('ionViewDidLoad OnOffPeakPage');
  }


      //function for logout button
      logOut() {
        this.afAuth.auth.signOut();
        console.log('Logged out');
        this.navCtrl.push(LoginPage)
      }
  

}
