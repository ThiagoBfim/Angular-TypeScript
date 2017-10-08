import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/Components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {


  pessoas = [];
  filtro = new PessoaFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event.rows;
    this.pesquisar(pagina);
  }

  excluir(pessoa: any) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.exclusaoConfirmada(pessoa);
      }
    });

  }

  exclusaoConfirmada(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.renderizar('Registro excluido com sucesso!');
      }).catch(erro => this.errorHandlerService.handle(erro));
  }

  alterarStatus(pessoa: any) {
    this.pessoaService.alterarStatus(!pessoa.ativo, pessoa.codigo).then(() => {
      const msgSituacao = pessoa.ativo ? 'inativada' : 'ativada';
      this.renderizar(`Pessoa ${msgSituacao} com sucesso!`);
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  renderizar(mensagem: string) {
    if (this.grid.first === 0) {
      this.pesquisar();
    } else {
      this.grid.first = 0;
    }

    this.toastyService.success(mensagem);
  }

}
