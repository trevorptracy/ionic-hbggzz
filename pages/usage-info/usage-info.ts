import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth'
import { LoginPage } from '../login/login'
import { ThenNowPage } from '../then-now/then-now';
import { OnOffPeakPage } from '../on-off-peak/on-off-peak';
import { UsageOverTimePage } from '../usage-over-time/usage-over-time';
/**
 * Generated class for the UsageInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-usage-info',
  templateUrl: 'usage-info.html',
})
export class UsageInfoPage {

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
  //       this.navCtrl.push(LoginPage);  //if no user, reidrect to LoginPage
  //     })
  //     return false;
  //   }
  //   return true;
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsageInfoPage');
  }

    //function for Then-Now button
    gotoThenNow(){
      this.navCtrl.push(ThenNowPage)
    }
  
    //function for On-Off Peak
    gotoOnOffPeak(){
      this.navCtrl.push(OnOffPeakPage)
    }
  
    //function for Usage Overtime
    gotoUsageOvertime(){
      this.navCtrl.push(UsageOverTimePage)
    }


        //function for logout button
        logOut() {
          this.afAuth.auth.signOut();
          console.log('Logged out');
          this.navCtrl.push(LoginPage)
        }
    

}
