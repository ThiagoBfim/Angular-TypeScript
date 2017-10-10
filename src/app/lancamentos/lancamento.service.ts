import { AuthHttp } from 'angular2-jwt';
import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';
  constructor(private authHttp: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio)
        .format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim)
        .format('YYYY-MM-DD'));
    }

    return this.authHttp.get(`${this.lancamentoUrl}?resumo`, {search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements

        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {

    const params = new URLSearchParams();
    return this.authHttp.delete(`${this.lancamentoUrl}/${codigo}`)
      .toPromise().then(() => null);
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    const params = new URLSearchParams();

    return this.authHttp.post(`${this.lancamentoUrl}/`, JSON.stringify(lancamento))
      .toPromise().then((response => response.json()));
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const params = new URLSearchParams();

    return this.authHttp.put(`${this.lancamentoUrl}/${lancamento.codigo}`, JSON.stringify(lancamento))
      .toPromise().then((response => {
        const lancamentoAtualizado = response.json();
        this.converterStringParaDatas([lancamentoAtualizado]);
        return lancamentoAtualizado;
      }));
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    const params = new URLSearchParams();
    return this.authHttp.get(`${this.lancamentoUrl}/${codigo}`)
      .toPromise().then((response => {
        const lancamentoAtualizado = response.json();
        this.converterStringParaDatas([lancamentoAtualizado]);
        return lancamentoAtualizado;
      }));
  }

  private converterStringParaDatas(lancamentos: Lancamento[]) {
    lancamentos.forEach(f => {
      if (f.dataPagamento) {
        f.dataPagamento = moment(f.dataPagamento, 'YYYY-MM-DD').toDate();
      }
      f.dataVencimento = moment(f.dataVencimento, 'YYYY-MM-DD').toDate();
    });
  }
}
