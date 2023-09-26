import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RankingsService } from 'src/app/services/rankings.service';
import { TareaService } from './../../services/tarea.service';
import { Task } from './../../model/task';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  constructor( private tareaService:TareaService,
               private rankingService:RankingsService,
               private router:Router) { }

  tarea = new FormGroup({
    name: new FormControl('',[Validators.required]) , 
    description: new FormControl('',[Validators.required]),  
    date: new FormControl('',[Validators.required])  
  });
  changeTarea = new FormGroup({
    name: new FormControl('',[Validators.required]) , 
    description: new FormControl('',[Validators.required]),  
    date: new FormControl('',[Validators.required])  
  });

  return:any
  changeTask:any;
  id:any
  verAlerta:boolean = false;
  task:Task = {name: null, description: null, date: null,ranking_id: null};

  ngOnInit(): void {this.recoger()}
  volver(){this.router.navigate(['menuProfessor'])}
  cerrar(){this.verAlerta = false}
  cancelModificar(){this.changeTask = 0;}
  verModificar(id:number){

    let task:any

    for (let i = 0; i < this.return.length; i++) {
      
      if(this.return[i].id == id){ task = this.return[i]}

    }

    this.changeTarea.setValue({
        
      name: task.name,
      description: task.description,
      date: task.date
    });

    this.changeTask= id;
  }

  recoger(){

    this.tareaService.recogerTarea(this.rankingService.rankigSelected).subscribe({
        
      next: (value: any) => {
        this.return = value.data;
      }
    });
    
  }

  save(){

    this.task.name = this.tarea.controls['name'].value
    this.task.ranking_id = this.rankingService.rankigSelected
    this.task.description = this.tarea.controls['description'].value
    this.task.date = this.tarea.controls['date'].value

    this.tareaService.saveTarea(this.task).subscribe({
        
      next: (value: any) => {
        if(value.status == 1){
          Swal.fire(
            'Creacion exitosa',
            'La tera se a creado con exito',
            'success'
          )
          
          this.recoger();
        } else {
 
          Swal.fire(
            'Ha habido algun problema',
            'Intentelo de nuevo llenando todos los campos',
            'warning'
          )

        }
        
      }
    });
    
  }

  modificar(id:number){

    let task:any = {
      id: id,
      name: this.changeTarea.controls['name'].value,
      description: this.changeTarea.controls['description'].value,
      date: this.changeTarea.controls['date'].value
    }

    this.tareaService.modificarTarea(task).subscribe({
        
      next: (value: any) => {
        if(value.status == 1){
          Swal.fire(
            'Se ha actualizado correctamente',
            'La tera se a actulizado de manera correcta',
            'success'
          )
          this.changeTask = 0;
          this.recoger()

        } else {
 
          Swal.fire(
            'La tera no se a podido actulizar',
            'Comprueba los campos y corrijalos',
            'warning'
          )

        }
        
      }
    });
    
  }

  borrar(id:number){

    this.id = id

    this.tareaService.eliminarTarea(id).subscribe({
        
      next: (value: any) => {

        Swal.fire({
          title: 'Estas seguro que quieres borrar la tarea?',
          showDenyButton: true,
          confirmButtonText: 'Si"',
          denyButtonText: `No!`,
        }).then((result) => {
          if (result.isConfirmed) {
            if(value.status == 1){
              Swal.fire(
                'Se a borrado correctamente',
                'La tarea se a eliminado de forma correcta',
                'success'
              )
              this.return = value;
              this.verAlerta = false
              this.recoger()
    
            } else {
     
              Swal.fire(
                'No se a podido borrar la tarea',
                'No se a podido borrar, pruebelo mas tarde.',
                'warning'
              )
            } 
          } 
        })
      }
    });
  }
  
}
