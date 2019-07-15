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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // user
    private user: UserService,
    //auth
    private authService: AuthService,
    private router: Router //final auth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    let that:any = this;

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          let me = this.user.getMe().then(res => {
            console.log('me', res);
            this.router.navigate(["aluno"]);
          })
        } else {
          this.router.navigate(["login"]);
        }
      });
    });
  }
}
