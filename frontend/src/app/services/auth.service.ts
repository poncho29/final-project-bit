import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Token } from '../models/token';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router:Router) { }

  registrarUsuario(user:User):Observable<Token>{
    return this.http.post<Token>(this.URL+'/registro',user);
  }

  loginUsuario(user:User){
    return this.http.post<Token>(this.URL+'/login',user);
  }

  usuarioLogueado():boolean{
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken():string | null{
    return localStorage.getItem('token');
  }

}
