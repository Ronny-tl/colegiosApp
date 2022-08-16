import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  urlBase = environment.urlBackend;
  constructor(private _http: HttpClient) { }

  getCursos(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}cursos/`)
  }

  setCurso(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}cursos/`, dataJson)
  }

  updateCurso(dataJson): Observable<any>{
    return this._http.put(`${this.urlBase}cursos/${dataJson.codigoCurso}/`, dataJson)
  }

  deleteCurso(codigoCurso){
    return this._http.delete(`${this.urlBase}cursos/${codigoCurso}/`)
  }


}
