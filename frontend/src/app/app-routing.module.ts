import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components

import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

//Importamos el guard que creamos, para darle acceso o no a una ruta dependiendo si esta loqueado o no.
import { AuthGuard } from './guards/auth.guard';
import { NoFoundPageComponent } from './components/no-found-page/no-found-page.component';
import { HomeComponent } from './components/home/home.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ProductosComponent } from './components/productos/productos.component';
import { DashboardProductosComponent } from './components/dashboard-productos/dashboard-productos.component';
import { InventarioProductosComponent } from './components/inventario-productos/inventario-productos.component';
import { RegistroProductosComponent } from './components/registro-productos/registro-productos.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch:'full'},
  {path: 'inicio', component: HomeComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'admin-productos', component: DashboardProductosComponent, canActivate:[AuthGuard],
    children:[
      {path: '', component: InventarioProductosComponent},
      {path: 'registro', component: RegistroProductosComponent},
      {path: 'editar/:id', component: RegistroProductosComponent},
    ]},
  {path: '404', component: NoFoundPageComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
