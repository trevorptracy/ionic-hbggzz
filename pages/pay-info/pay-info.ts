import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { PaymentGraphsPage } from '../payment-graphs/payment-graphs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/**
 * Generated class for the PayInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pay-info',
  templateUrl: 'pay-info.html',
})
export class PayInfoPage {

  

  constructor( private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
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
  /////////////////

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayInfoPage');
  }

  /////////////////////////////////
  // API trials
  
  
  //non-proxy url// "url": "http://sparkapp-staging.spk.io:5010/api/v0/system-info",
  //proxy-url// "url": "/api/v0/system-info",
  getCustomer() {
    var settings = {
      "async": true,
      "crossDomain": true,
      //non-proxy url:
      //"url": "http://sparkapp-staging.spk.io:5010/api/v0/customers",
      "url": "/api/v0/customers",
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "Authentication-Token": ".eJwFwckRgDAIAMBeeMsMVxBqcXwkIP2X4O4DU98RL0FaRmgzimlyY2U0iURYF1zQe6WOH2PhoKgtmZyq7lms7PD-1XwSjg.DuB2Ag.P4NC3M-TOUNp1z6gexWbW4WoAb4",
        "Access-Control-Allow-Headers": "*"
      }
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response.customers.length);
      console.log(response.customers[0]);
      console.log(response);
    });//*/
  }

  //function for Payment Graphs button
  gotoGraphs(){
    this.navCtrl.push(PaymentGraphsPage)
  }

  
  rows = [
    {
        "date": "07/03/2019",
        "amount": "20"
    },
    {
        "date": "10/02/2018",
        "amount": "50"
    },
    {
      "date": "07/03/2018",
      "amount": "70"
  },
  {
      "date": "10/02/2017",
      "amount": "10"
  },
  {
    "date": "07/03/2017",
    "amount": "70"
},
{
    "date": "10/02/2016",
    "amount": "10"
},
{
  "date": "07/03/2016",
  "amount": "70"
},
{
  "date": "10/02/2015",
  "amount": "10"
},
{
  "date": "07/03/2015",
  "amount": "70"
},
{
  "date": "10/02/2014",
  "amount": "10"
},
{
  "date": "07/03/2014",
  "amount": "70"
},
{
  "date": "10/02/2013",
  "amount": "10"
}

  ]


    //function for logout button
    logOut() {
      this.afAuth.auth.signOut();
      console.log('Logged out');
      this.navCtrl.push(LoginPage)
    }
}
