import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

/* Los Guard es tan solo una manera de proteger las rutas desde el frontend, esto no tiene nada que ver con el backend,
  entonces lo que estamos haciendo con este AuthGuard es colocar una funcion que se encargue de ver si existe un Token o no en
  el localstorage, si el token existe va a retornar un true y va a continuar con la ruta que queremos mostrar, si por el contrario
  no tiene un token, entonces retorna un false y lo que va hacer es redireccionar a la ruta del login para que inicie la sesion y asi poder
  obtener el Token que se necesita para navegar por esa ruta.
*/
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){}

  canActivate(): boolean{
    if(this.authService.usuarioLogueado()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }

}
