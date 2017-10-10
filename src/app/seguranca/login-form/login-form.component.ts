import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
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
  constructor(private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router) { }


  login() {
    this.authService.login(this.usuario, this.senha)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      }).catch(erro => {
        this.errorHandlerService.handle(erro);
        this.senha = '';
      });
  }

}
