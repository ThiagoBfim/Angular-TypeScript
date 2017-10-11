import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAcessTokenInvalido()) {
      return this.authService.obterNovoAcessToken()
        .then(() => {
          // Se for falso o token não foi gerado.
          if (this.authService.isAcessTokenInvalido()) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        });
    }
    if (next.data.roles && !this.authService.temQualquerPermissao(next.data.roles)) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }
}
