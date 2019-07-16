import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

//auth
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
// user
import { UserService } from './services/user.service';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  user:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // user
    private userService: UserService,
    //auth
    private authService: AuthService,
    private router: Router //final auth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        let _routes:string[] = [];

        if (state) {
          this.user = this.authService.userState.value;

          if(this.user.tipo_user == 0){
            this.router.navigate(["aluno"]);
          }
          else if(this.user.tipo_user == 1){
            this.router.navigate(["personal"]);
          }

        } else {
          this.router.navigate(["login"]);
        }
      });
    });
  }
}
