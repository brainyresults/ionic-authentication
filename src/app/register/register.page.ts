import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from "../services/user.service";
// notify
import { NotifyService } from "../services/notify.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async register(form:NgForm) {
    let _valid = false;
    let _form = form.value;
    _form.tipo_user = 0;

    if(_form.password === _form.confirm){
      _valid = true;
    }
    delete _form.confirm;

    if(_valid){
      await  this.notifyService.showLoading();
      let user = await this.userService.addUser(_form).then(async (res) =>{
        console.log(res);
        
        let userLogin = {
          email: _form.email,
          password: _form.password,
        };

        await this.userService.login(userLogin).then(async (res) => {
          await this.notifyService.hideLoading();
          await this.notifyService.exibirMensagem('Usuário cadastrado com sucesso!');
          this.router.navigate(['aluno']);
        });
      })
    }
  }

}
