import { Component, OnInit } from "@angular/core";
//auth
import { AuthService } from "./../../services/auth.service";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.page.html",
  styleUrls: ["./aluno.page.scss"]
})
export class AlunoPage implements OnInit {
  data = "";
  user:any;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.user = this.authService.userState.value;
  }

  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res["msg"];
    });
  }

  logout() {
    this.authService.logout();
  }

  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove("access_token");

    let toast = this.toastController.create({
      message: "JWT removed",
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
}
