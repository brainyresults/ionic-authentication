import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

//auth
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthInterceptor } from './services/auth.interceptor';

//services
import { UserService } from "./services/user.service";

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get("access_token");
    },
    whitelistedDomains: ["localhost:5000"]
  };
}
//final auth

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    //auth
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
    //final auth
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    {
      provide: UserService,
      useFactory: getUserService,
      deps: [HttpClient]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getUserService(http: HttpClient): UserService {
  return new UserService(http);
}