import { Component, OnInit } from '@angular/core';
import { Tareas } from 'src/app/models/tareas';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas!:Tareas[];

  constructor(private tareasService:TareasService) { }

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe((res:Tareas[]) => {
      this.tareas = res;
    },err => {
      console.log(err);
    });
  }

}
