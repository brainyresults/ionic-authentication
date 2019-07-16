import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  user:any;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.userState.value;
  }

  logout() {
    this.authService.logout();
  }
}
