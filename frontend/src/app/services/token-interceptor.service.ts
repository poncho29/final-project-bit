import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

/* Esta clase va a servir para añadir globalmente, osea en toda la aplicacion, el formato del token es decir que
    primero vaya el (Bearer,espacio,token) ejemplo: Bearer 26363vhhsysv3
*/

export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) { }

  /* Esta funcion recibe 2 parametros un req = la manera en que el va a tomar la informacion que hiciste en cada
      peticion y va a tratar de añadir mas informacion a una cabecera, es decir, con esto lo que estoy haciendo es
      hacer una cabecera en cada peticion o añadir una cabecera en cada peticion, para no hacerlo manualmente cada vez que
      voy a estar por ejemplo pidiendo algo al servidor

  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeReq =  req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
