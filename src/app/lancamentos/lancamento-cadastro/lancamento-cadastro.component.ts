import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    let msg = 'Cadastro de Lançamento';


    const codigo = this.route.snapshot.params['codigo'];
    if (codigo === null || codigo !== 'novo') {
      msg = 'Edição de Lançamento';
      this.lancamentoService.buscarPorCodigo(codigo)
        .then(lancamento => this.lancamento = lancamento)
        .catch(erro => this.errorHandlerService.handle(erro));
    }
    this.carregarCategorias();
    this.carregarPessoas();
    this.title.setTitle(msg);
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento).then(lancamento => {
      this.lancamento = lancamento;
      this.toastyService.success('Lancamento atualizado com sucesso!');
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  adicionarLancamento(form: FormControl) {
    return this.lancamentoService.salvar(this.lancamento).then(lancamento => {
      this.lancamento = lancamento;
      this.router.navigate(['/lancamentos', lancamento.codigo]);
      this.toastyService.success('Lancamento adicionado com sucesso!');
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  resetar() {
    // Estou fazendo isso pq o reset do formulario é executado antes da ação abaixo.
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.title.setTitle('Cadastro de Lançamento');
    this.router.navigate(['/lancamentos/novo']);
  }

}
