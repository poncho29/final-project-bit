import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Importamos el guard que creamos y lo utilizamos en providers y asi poderlo utilizar en cualquier clase nuestra aplicacion.
import { AuthGuard } from './guards/auth.guard';

//Importamos el token-interceptor que creamos y lo utilizamos en providers y asi poderlo utilizar en cualquier clase de nuestra app.
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { NoFoundPageComponent } from './components/no-found-page/no-found-page.component';
import { HomeComponent } from './components/home/home.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { DashboardProductosComponent } from './components/dashboard-productos/dashboard-productos.component';
import { InventarioProductosComponent } from './components/inventario-productos/inventario-productos.component';
import { RegistroProductosComponent } from './components/registro-productos/registro-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    NoFoundPageComponent,
    HomeComponent,
    CarritoComponent,
    NosotrosComponent,
    ProductosComponent,
    FiltroPipe,
    LoadingComponent,
    DashboardProductosComponent,
    InventarioProductosComponent,
    RegistroProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
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
