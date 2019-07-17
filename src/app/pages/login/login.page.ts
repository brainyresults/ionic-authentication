import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

//auth
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
// notify
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService,
  ) {}

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: [""],
      password: [""]
    });
  }

  async onSubmit() {
    await  this.notifyService.showLoading();
    this.authService.login(this.credentialsForm.value).subscribe(async res => {
      await this.notifyService.hideLoading();
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  cancelar(){
    this.router.navigate(['login']);
  }

}
