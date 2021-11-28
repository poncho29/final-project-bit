import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareasPrivadasComponent } from './components/tareas-privadas/tareas-privadas.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Importamos el guard que creamos y lo utilizamos en providers y asi poderlo utilizar en cualquier clase nuestra aplicacion.
import { AuthGuard } from './guards/auth.guard';

//Importamos el token-interceptor que creamos y lo utilizamos en providers y asi poderlo utilizar en cualquier clase de nuestra app.
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    TareasComponent,
    TareasPrivadasComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
