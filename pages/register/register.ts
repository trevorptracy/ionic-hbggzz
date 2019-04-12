import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../user-info/user-info';
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  newUser = {} as User;  //holds the info entered in the html in the form of User

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  //checks if there is a user still signed in and signs them out
  ionViewDidEnter() {
    if(this.afAuth.auth.currentUser){
      // [START signout]
      console.log(this.afAuth.auth.currentUser.email)
      this.afAuth.auth.signOut();
      // [END signout]
      console.log('signed out')
    } else {console.log('no user')}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //function for Register button
  register(newUser){
      // if no username is entered, give message
      if (newUser.email) { 
      } else {
        alert('Please enter an email address.');
        return;
      }
    
      // if no password is entered, give message
      if (newUser.password) {
  
      } else {
        alert('Please enter a password.');
        return;
      }
  
      // [START createwithemail]
      this.afAuth.auth.createUserWithEmailAndPassword(newUser.email+'@test.xta', newUser.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
}
