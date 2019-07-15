import { Component, OnInit } from "@angular/core";
//auth
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: [""],
      password: [""]
    });
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
  register() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
}
