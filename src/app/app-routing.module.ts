import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { AuthGuard } from './seguranca/auth.guard';


const routes: Routes = [
    { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent , canActivate: [AuthGuard]},
    { path: 'nao-autorizado', component: NaoAutorizadoComponent , canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({

    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
