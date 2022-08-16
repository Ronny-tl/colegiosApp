import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {
  urlBase = environment.urlBackend;
  constructor(private _http: HttpClient) { }

  getApoderados(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}tutor/`)
  }

  setApoderado(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}tutor/`, dataJson)
  }

  updateApoderado(dataJson): Observable<any>{
    return this._http.put(`${this.urlBase}tutor/${dataJson.codigoTutor}/`, dataJson)
  }

  deleteApoderado(codigoTutor){
    return this._http.delete(`${this.urlBase}tutor/${codigoTutor}/`)
  }
}
