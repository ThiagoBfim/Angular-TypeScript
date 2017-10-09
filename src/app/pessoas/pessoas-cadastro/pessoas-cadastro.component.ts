import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from '../pessoa.service';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  constructor(private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit(): void {
    let msg = 'Cadastro de Pessoa';
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      msg = 'Edição de Pessoa';
      this.pessoaService.buscarPorCodigo(codigo)
        .then(pessoa => this.pessoa = pessoa)
        .catch(erro => this.errorHandlerService.handle(erro));
    }
    this.title.setTitle(msg);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.editarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    return this.pessoaService.salvar(this.pessoa).then(pessoa => {
      this.pessoa = pessoa;
      this.router.navigate(['/pessoas', pessoa.codigo]);
      this.toastyService.success('Pessoa adicionada com sucesso!');
      this.pessoa = new Pessoa();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  editarPessoa() {
    this.pessoaService.editar(this.pessoa).then(pessoa => {
      this.pessoa = pessoa;
      this.toastyService.success('Pessoa alterada com sucesso!');
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  resetar() {
    // Estou fazendo isso pq o reset do formulario é executado antes da ação abaixo.
    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.title.setTitle('Cadastro de Pessoa');
    this.router.navigate(['/pessoas/novo']);
  }

}
