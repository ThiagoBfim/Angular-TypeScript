import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';
  constructor(private http: Http) { }


  listarTodas(): Promise<any> {

    const headers = new Headers();
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDc3NzU1OTUsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIxOWZiNzZjZS1iNGNhLTQ4YTktOGRmZi04ZjMwZDg1MTk3NDUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.D5uC2NrsNHaz8QyY8jMBA5oTQgENk-QaIdH0PQmj1lk');

    return this.http.get(this.categoriaUrl, { headers })
      .toPromise()
      .then(response => response.json());
  }
}
