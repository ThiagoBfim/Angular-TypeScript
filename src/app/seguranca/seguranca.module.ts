import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing-module';
import { SharedModule } from '../shared/shared.module';
import { PrimeFacesModuleModule } from '../prime-faces-module/prime-faces-module.module';

@NgModule({
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    PrimeFacesModuleModule,
    FormsModule,
    SharedModule

  ],
  declarations: [LoginFormComponent]
})
export class SegurancaModule { }
