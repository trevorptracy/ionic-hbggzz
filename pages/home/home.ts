import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { PayInfoPage } from '../pay-info/pay-info';
import { UsageInfoPage } from '../usage-info/usage-info';
import { LoginPage } from '../login/login'
import { TariffInfoPage } from '../tariff-info/tariff-info';
import { ChangeLanguagePage } from '../change-language/change-language';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import 'firebase/storage';
import * as papa from 'papaparse';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

var transCSVrslts : any;
var meterCSVrslts : any;
var readCSVrslts : any;
var tn = 0;
var mn = 0;
var rn = 0;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lang:any;
  transURL:any;
  meterURL:any;
  readURL:any;
  tdate: any = '05/03/2019';
  tamount: any = '500 G';
  vendor: any = '???';
  timeEst: any = '2';
  tariff: any;
  meterID: any;
  public user:any;
  public custNum:string;

  constructor(private fireStore: AngularFirestore, private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController) {
    this.getCSV();
  }

    getCSV(){

      firebase.storage().ref().child('EarthSpark transactions 2019-02-16 to 2019-02-22.csv').getDownloadURL()
      .then( response =>
        {
          this.transURL = response;
          console.log('The transaction file URL is:' + this.transURL)
          
          //this.transParseCSV();
        }
      )
      .catch(error => console.log('error', error))

      firebase.storage().ref().child('EarthSpark meters 2019-02-24.csv').getDownloadURL()
      .then( response =>
        {
          this.meterURL = response;
          console.log('The meter file URL is:' + this.meterURL)
          
          //this.meterParseCSV();
        }
      )
      .catch(error => console.log('error', error))

      firebase.storage().ref().child('EarthSpark readings 2019-02-16 to 2019-02-22.csv').getDownloadURL()
      .then( response =>
        {
          this.readURL = response;
          console.log('The readings file URL is:' + this.readURL)
          this.readParseCSV();
        }
      )
      .catch(error => console.log('error', error))

    }

    //Have to figure out CORS issue for ionic serve - should not happen when on actual device

  transParseCSV(){
      //https://www.papaparse.com/ for other uses of this papa parase
      
      papa.parse(this.transURL,{
        download:true,
        header: true,
        dynamicTyping: true,
        complete: function(results){

          console.log(results.data)
          tn = 1;
          transCSVrslts = results.data;
        }
      }
      )
    
  }

  meterParseCSV(){

      papa.parse(this.meterURL,{
        download:true,
        header: true,
        dynamicTyping: true,
        complete: function(results){
          console.log(results.data)
          meterCSVrslts = results.data;
          mn = 1;
        }
      }
      )
    
  }

  readParseCSV(){
    //https://www.papaparse.com/ for other uses of this papa parase
    
    papa.parse(this.readURL,{
      download:true,
      header: true,
      dynamicTyping: true,
      complete: function(results){
        console.log(results.data)
        rn = 1;
        readCSVrslts = results.data;
      }
    }
    )
  
}
  

    storeID(){
      
      if (mn > 0){
        meterCSVrslts.forEach((transaction, index)=>{
  
          if (meterCSVrslts[index].customer_code){
  
          this.fireStore
          .collection("CustomerIDs").doc(meterCSVrslts[index].customer_code)
          .set({
            custID: meterCSVrslts[index].customer_code,
            meterID: meterCSVrslts[index].serial,
            tariff: meterCSVrslts[index].tariff,
            lastEnergy: meterCSVrslts[index].last_energy,
            lastEnergyDate: meterCSVrslts[index].last_energy_datetime,
            totalEnergy: meterCSVrslts[index].total_cycle_energy,
            creditBalance: meterCSVrslts[index].credit_balance,
            meterSite: meterCSVrslts[index].system,
            archived: meterCSVrslts[index].hidden,
            custName: meterCSVrslts[index].customer_name,
          })
          .then(function(docRef) {
            //console.log("Document written with ID: ", index);
            console.log("Meter file info saved")
            mn = 0;
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        }}
        )
        
      }

      

    if (tn > 0){
      transCSVrslts.forEach((transaction, index)=>{

        if (transCSVrslts[index].id){

        this.fireStore
        .collection("TransactionIDs").doc(transCSVrslts[index].id)
        .set({
          transID: transCSVrslts[index].id,
          amount: transCSVrslts[index].amount,
          transDate: transCSVrslts[index].created,
          meter: transCSVrslts[index].to,
          error: transCSVrslts[index].error
        })
        .then(function(docRef) {
          //console.log("Document written with ID: ", index);
          console.log("Transaction file info saved")
          tn = 0;
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }}
      )
      
    }

    

    if (rn > 0){

      var pastDate = readCSVrslts[0].localtime_hour.substring(0,10);
      var pastMeter = readCSVrslts[0].serial;
      var totalKwh = 0;
      var curMinVolt = readCSVrslts[0].voltage_min;
      var curMaxVolt = readCSVrslts[0].voltage_max;
      var totalAvgVolt = 0;
      var index = 0;
      var avgNum = 0;
      var curMeterSite = readCSVrslts[0].system;
      var avgvlt: number;

      var newData: any[] = [];

      var dataObj : {
        readTime: string,
        meterID: string,
        kwhConsumed: number,
        minVoltage: number,
        avgVoltage: number,
        maxVoltage: number,
        meterSite: string
      };

      while( index < readCSVrslts.length ){

        if( readCSVrslts[index].serial ){

          while ( readCSVrslts[index].serial && pastMeter == readCSVrslts[index].serial && pastDate == readCSVrslts[index].localtime_hour.substring(0,10)){

            totalKwh = totalKwh + readCSVrslts[index].kilowatt_hours;
            totalAvgVolt = totalAvgVolt + readCSVrslts[index].voltage_avg;

            if( curMinVolt > readCSVrslts[index].voltage_min ){
              curMinVolt = readCSVrslts[index].voltage_min
            }

            if( curMaxVolt < readCSVrslts[index].voltage_max ){
              curMaxVolt = readCSVrslts[index].voltage_max
            }

            avgNum++;
            index++;
          }

          avgvlt = totalAvgVolt/avgNum;

          
          dataObj = {
            readTime: pastDate,
            meterID: pastMeter,
            kwhConsumed: totalKwh,
            minVoltage: curMinVolt,
            avgVoltage: avgvlt,
            maxVoltage: curMaxVolt,
            meterSite: curMeterSite
          }

          newData.push(dataObj)
          
          if( readCSVrslts[index].serial ){
            pastMeter = readCSVrslts[index].serial;
            pastDate = readCSVrslts[index].localtime_hour.substring(0,10);
            totalKwh = 0;
            totalAvgVolt = 0;
            curMinVolt = readCSVrslts[index].voltage_min;
            curMaxVolt = readCSVrslts[index].voltage_max;
            avgNum = 0;
            avgvlt = 0;
            curMeterSite = readCSVrslts[index].system;
          }
          
        } else {
          index++;
        }
      }

      //////////////////////////
      console.log("Done sorting readings file")
      console.log("Beginning saving process")
      //////////////////////////

      
      newData.forEach((transaction, i)=>{
        if (newData[i].meterID){
          this.fireStore
          .collection("meterIDs").doc(newData[i].meterID).collection("readingDate").doc(newData[i].readTime)
          .set({
          readTime: newData[i].readTime,
          meterID: newData[i].meterID,
          kwhConsumed: newData[i].kwhConsumed,
          minVoltage: newData[i].minVoltage,
          aveVoltage: newData[i].avgVoltage,
          maxVoltage: newData[i].maxVoltage,
          meterSite: newData[i].meterSite
        })
        .then(function(docRef) {
          //console.log("Document written with ID: ", i);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }}
      
      )
      console.log("Reading file info saved")
      rn = 0;

      
    }
    }

    displayInfo(){
      this.getData().subscribe((data) =>
      {
        this.tariff = data.tariff;
        this.meterID = data.meterID;
      }
      )
      this.getTransactionHistory().subscribe((data) =>
      {
        //this.tariff = data.tariff;
        //this.meterID = data.meterID;
      }
      )
    }


    getData() : Observable<any> {
      return this.fireStore.collection("CustomerIDs").doc("AV1").valueChanges()
    }

    getTransactionHistory() : Observable<any> {
      //var myRef = this.fireStore.collection("TransactionIDs");
      //return myRef.where("meter", "==","SM5R-04-00006660");

      console.log(this.fireStore.collection('TransactionIDs').get());

      this.fireStore.collection('TransactionIDs').get()
      .toPromise()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              //console.log(doc.id);
          });
      });


      return this.fireStore.collection('TransactionIDs', ref => {
        
        var query = ref;
        //var lala = query.where("meter", "==","SM15R-01-000000FB");
        var lala = query.where("amount", "==","1000.0");
        
        lala.get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id);
            });
        });
        
        //console.log(lala.where("meter", "==","SM15R-01-000000FB"));
        return lala;
      }).valueChanges();
    }
  


   //check if a user is logged in before entering the page
   
   /*
   async ionViewCanEnter(): Promise<boolean> {
     try {
       await this.afAuth.auth.currentUser.email;
     } 
     catch (err){
       console.log('NO USER. REDIRECT.');
    
       setTimeout(() => {
         this.navCtrl.push(LoginPage); //if no user, reidrect to LoginPage
       })
       return false;
     }
     return true;
   }
   */

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    if(this.afAuth.auth.currentUser == null){
      this.custNum='not logged in';
    }else{
      this.user = this.afAuth.auth.currentUser.email;
      this.custNum = this.user.slice(0,-9) ;
    }

  }


  //function for logout button
  logOut() {
    this.afAuth.auth.signOut();
    console.log('Logged out');
    this.navCtrl.push(LoginPage)
  }

  //function for Payment Info button
  gotoPayInfo(){
    this.navCtrl.push(PayInfoPage)
  }

  //function for Usage Info button
  gotoUseInfo(){
    this.navCtrl.push(UsageInfoPage)
  }

  getAPIData(){
    console.log("Customer API Data:")
    console.log(this.afAuth.auth.currentUser.emailVerified)
  }

  getCustomerID(){
    console.log("Customer ID:")
    if(this.afAuth.auth.currentUser == null){
      console.log('not logged in');
    }else{
      console.log(this.afAuth.auth.currentUser.email)
    }
  }
  
  gotoTariff(){
    this.navCtrl.push(TariffInfoPage)
  }

  changeLang(){
    this.navCtrl.push(ChangeLanguagePage)
  }

}
