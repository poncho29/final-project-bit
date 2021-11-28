import { Component, OnInit } from '@angular/core';
import { Tareas } from 'src/app/models/tareas';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tareas-privadas',
  templateUrl: './tareas-privadas.component.html',
  styleUrls: ['./tareas-privadas.component.css']
})
export class TareasPrivadasComponent implements OnInit {

  tareasPrivadas!:Tareas[];

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    this.tareasService.getTareasPrivadas().subscribe((res:Tareas[]) => {
      this.tareasPrivadas = res;
    },err => {
      console.log(err);
    });
  }

}
