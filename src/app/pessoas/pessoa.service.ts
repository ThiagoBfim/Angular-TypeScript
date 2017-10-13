import { AuthHttp } from 'angular2-jwt';
import { Pessoa } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?listar`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements

        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoasUrl}?listar`, )
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise().then(() => null);
  }

  alterarStatus(ativo: boolean, codigo: Number): Promise<void> {


    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise().then(() => null);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const params = new URLSearchParams();

    return this.http.post(`${this.pessoasUrl}/`, JSON.stringify(pessoa))
      .toPromise().then((response => response.json()));
  }

  editar(pessoa: Pessoa): Promise<Pessoa> {
    const params = new URLSearchParams();
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise().then((response => {
        console.log(response.json());
        return response.json();
      }));
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {

    const params = new URLSearchParams();

    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise().then((response => response.json()));
  }

}
