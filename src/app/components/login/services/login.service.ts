import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlBase = environment.urlBackend;
  constructor(
    private _http: HttpClient
  ) { }


  login(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}loginAdmin`, dataJson);
  }

  loginAlumno(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}loginAlumno`, dataJson);
  }
}
