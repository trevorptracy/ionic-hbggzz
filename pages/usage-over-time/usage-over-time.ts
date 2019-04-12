import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the UsageOverTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usage-over-time',
  templateUrl: 'usage-over-time.html',
})
export class UsageOverTimePage {

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
    console.log('ionViewDidLoad UsageOverTimePage');
  }



  public thisMonthData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40]}
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    //{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public thisMonthLabel:Array<any> = ['1', '5', '10', '15', '20', '25', '30'];
  
  public thisYearData:Array<any> = [
    {data: [40,30,60,70,10,25,40,60,20,60, 78, 67]}
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    //{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public thisYearLabel:Array<any> = ['Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
   
  public allYearsData:Array<any> = [
    {data: [125, 159, 180, 131, 176, 135, 180]}
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    //{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public allYearsLabel:Array<any> = ['2013','2014','2015','2016','2017','2018','2019'];
  
  public lineChartOptions:any = {
    responsive: true,
    legend: {
      display: false
   },
   maintainAspectRatio:false
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }


      //function for logout button
      logOut() {
        this.afAuth.auth.signOut();
        console.log('Logged out');
        this.navCtrl.push(LoginPage)
      }  

}
