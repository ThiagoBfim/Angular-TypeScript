import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  usuario: string;
  senha: string;
  constructor(private authService: AuthService) { }


  login() {
    this.authService.login(this.usuario, this.senha);
  }

}
