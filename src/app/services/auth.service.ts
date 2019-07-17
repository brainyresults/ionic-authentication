import { Platform, AlertController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { environment } from "../../environments/environment";
import { tap, catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { ToastController } from "@ionic/angular";
import { UserService } from "./user.service";
import { inject } from '@angular/core/testing';

const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token:string;
  url = environment.url;
  userProfile:any;
  authenticationState = new BehaviorSubject(false);
  userState = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController,
    private toastController: ToastController,
    private userService: UserService,
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  getToken(){
    return this.token;
  }
  
  getUser(){
    return this.userState.value;
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.userProfile = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
          this.authenticationState.next(false);
        }
      }
    });
  }

  register(credentials) {
    let toast = this.toastController.create({
      message: "Usuário Cadastrado com sucesso",
      duration: 3000
    });
    toast.then(toast => toast.present());

    return this.http.post(`${this.url}/users`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  login(credentials) {
    return this.http.post(`${this.url}/users/login`, credentials).pipe(
      tap(async res => {
        this.token = res["token"];
        this.storage.set(TOKEN_KEY, res["token"]);
        this.userProfile = this.helper.decodeToken(res["token"]);

        let user = await this.userService.getUser(this.userProfile.id).then(res => {
          this.userState.next(res);
        });
        this.authenticationState.next(true);
      }),
      catchError(e => {
        console.log(e);
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  getSpecialData() {
    return this.http.get(`${this.url}/ping`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert("You are not authorized for this!");
          this.logout();
        }
        throw new Error(e);
      })
    );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Ocorreu um erro",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }
}
