import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { TareasComponent } from './components/tareas/tareas.component';
import { TareasPrivadasComponent } from './components/tareas-privadas/tareas-privadas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

//Importamos el guard que creamos, para darle acceso o no a una ruta dependiendo si esta loqueado o no.
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'tareas', pathMatch: 'full'},
  {path: 'tareas', component: TareasComponent},
  {path: 'privado', component: TareasPrivadasComponent, canActivate:[AuthGuard]},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
