import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tareas } from '../models/tareas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private URL = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getTareas():Observable<Tareas[]>{
    return this.http.get<Tareas[]>(this.URL+'/tareas');
  }

  getTareasPrivadas():Observable<Tareas[]>{
    return this.http.get<Tareas[]>(this.URL+'/tareas-privadas');
  }

}
