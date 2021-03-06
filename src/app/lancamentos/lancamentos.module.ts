import { LancamentosRoutingModule } from './lancamentos-routing-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { SharedModule } from './../shared/shared.module';

import { PrimeFacesModuleModule } from './../prime-faces-module/prime-faces-module.module';

import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrimeFacesModuleModule,
    CurrencyMaskModule,
    SharedModule,
    LancamentosRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  exports: []
})
export class LancamentosModule { }
