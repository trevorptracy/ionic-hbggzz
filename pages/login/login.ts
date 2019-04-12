import { Component } from '@angular/core';
import { NavController, NavParams/*, ToastController*/ } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../user-info/user-info';
import { RegisterPage } from '../register/register';
import { ScreensaverPage } from '../screensaver/screensaver';
import { AngularFireAuth } from 'angularfire2/auth';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Platform } from 'ionic-angular';
import { ChangeLangLoginPage } from '../change-lang-login/change-lang-login';
//export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AndroidFullScreen, Keyboard]
})
export class LoginPage {
  lang:any;


  user = {} as User; //holds the info entered in the html in the form of User

  constructor(platform: Platform, private keyboard: Keyboard, private androidFullScreen: AndroidFullScreen, private afAuth: AngularFireAuth, /*private toast: ToastController,*/ public navCtrl: NavController, public navParams: NavParams) {
  }


  fullscreen() {
    
    if(this.androidFullScreen){
      this.androidFullScreen.immersiveMode();
    } else {console.log('no immersion supported')}
    
   //this.androidFullScreen.immersiveMode();
    /*
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error:any) => console.log(error));
    */
  }
  
  //checks if there is a user still signed in and signs them out
  ionViewDidEnter() {
    if(this.afAuth.auth.currentUser){
      // [START signout]
      console.log(this.afAuth.auth.currentUser.email)
      this.afAuth.auth.signOut();
      console.log('sign out')
      // [END signout]
    } else {console.log('no user')}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.keyboard.show;
  }

  //function for Screensaver button
  screensaver(){
    this.navCtrl.push(ScreensaverPage);
  }

  //function for Register button
  register(){
    this.navCtrl.push(RegisterPage);
  }

  //function for Login button
  logIn(user){

      // if no username is entered, give message
      if (user.email) { 
        } else {
          alert('Please enter an email address.');
          return;
        }
      
      // if no password is entered, give message
      if (user.password) {
      } else {
        alert('Please enter a password.');
        return;
      }
      
      // Firebase command to sign in. Goes to HomePage
      this.afAuth.auth.signInWithEmailAndPassword(user.email+'@test.xta', user.password).then((res) => {
        console.log(res);
        console.log(user);
  
        this.navCtrl.push(HomePage);
      })
      .catch((error) => {
       // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      })
    }
      
    changeLang(){
      this.navCtrl.push(ChangeLangLoginPage)
    }
      
}

      //https://github.com/firebase/quickstart-js/blob/912f4c94738da79f659996dddea10c4021aa8a90/auth/email-password.html#L60-L73

