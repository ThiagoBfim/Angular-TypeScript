import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from '../pessoa.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  constructor(private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    return this.pessoaService.salvar(this.pessoa).then(() => {
      this.toastyService.success('Pessoa adicionado com sucesso!');
      form.reset();
      this.pessoa = new Pessoa();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
