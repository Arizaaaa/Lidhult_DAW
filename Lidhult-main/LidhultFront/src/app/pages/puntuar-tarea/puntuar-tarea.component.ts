import { TareaService } from 'src/app/services/tarea.service';
import { RankingsService } from 'src/app/services/rankings.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntuar-tarea',
  templateUrl: './puntuar-tarea.component.html',
  styleUrls: ['./puntuar-tarea.component.css']
})
export class PuntuarTareaComponent implements OnInit {

  constructor(public rankingsService:RankingsService,
              private tareaService:TareaService, 
              private router:Router) { }

  tasks:any
  id_task:any
  id_student:any
  student:any
  ver:boolean = true

  nota = new FormGroup({ puntos: new FormControl(0, [Validators.required]), });

  ngOnInit(): void { this.recogerTareas(this.rankingsService.rankigSelected) }

  volver(){this.router.navigate(['menuProfessor'])}

  verGuardar(id_task:number, id_student:number){

      this.id_task = id_task
      this.id_student = id_student
      this.ver = false;

  }

  cancelar(){

    this.id_task = 0
    this.ver = true;

}

  recogerTareas(id:number){

    let request = {id}

    this.tareaService.recogerTareas(request).subscribe({
        
      next: (value: any) => {
        this.tasks = value.data
      }
    });

  }

  puntuar(tarea_id:number,student_id:number){

    let puntos = this.nota.controls['puntos'].value
    let task_id = tarea_id
    this.tareaService.puntuar(puntos, task_id, student_id).subscribe({
        
      next: (value: any) => {

        if(value.status == 1){
          Swal.fire(
            'Se a puntuado correctamente',
            'Se actualizado',
            'success'
          )
          this.id_task = 0
          this.id_student = 0
          this.ver = true;
          this.recogerTareas(this.rankingsService.rankigSelected)
          this.nota.setValue({ puntos: 0 })

        } else {
 
          Swal.fire(
            'No se a actualizado',
            'No se a actualizado, vuelve a intentarlo',
            'warning'
          )

        }
      }
    });

  }

}
