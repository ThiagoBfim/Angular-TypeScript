import { MoneyHttp } from './money-http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing-module';
import { SharedModule } from '../shared/shared.module';
import { PrimeFacesModuleModule } from '../prime-faces-module/prime-faces-module.module';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      {'Content-Type': 'application/json'}
    ]
  });
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    PrimeFacesModuleModule,
    FormsModule,
    SharedModule

  ],
  declarations: [LoginFormComponent],
  providers: [
    {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [AuthService, Http, RequestOptions]
  },
  AuthGuard
  ]
})
export class SegurancaModule { }
