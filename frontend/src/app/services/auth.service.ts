import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Token } from '../models/token';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';
  private nameUser:string = '';
  private rolUser: string | null = '';
  private token: string | null = '';

  constructor(private http: HttpClient, private router:Router) {}

  verificarTokenAlCargar(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');

      let tokenLocalStorage = {'token': localStorage.getItem('token')};

      this.http.post<any>(`${this.URL}/inicio`,tokenLocalStorage).subscribe(res => {
        this.nameUser = res.name;
        this.rolUser = res.rol;
      },err => {

        this.cerrarSesion();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error}! verifique e intente nuevamente.`
        });
      });

    }
  }

  registrarUsuario(user:User):Observable<Token>{
    return this.http.post<Token>(this.URL+'/registro',user);
  }

  loginUsuario(user:User){
    return this.http.post<Token>(this.URL+'/login',user);
  }

  getNameUser():string | null{
    return this.nameUser;
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
