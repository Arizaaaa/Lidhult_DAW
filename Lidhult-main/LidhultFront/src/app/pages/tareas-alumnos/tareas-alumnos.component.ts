import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingsService } from 'src/app/services/rankings.service';
import { TareaService } from 'src/app/services/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-alumnos',
  templateUrl: './tareas-alumnos.component.html',
  styleUrls: ['./tareas-alumnos.component.css']
})
export class TareasAlumnosComponent implements OnInit {

  ver:boolean = true;
  id_task:number=0;
  fechaHoy:any = new Date();
  
  base:any;
  return:any;
  file:any;
  entragas:any;

  fechas:Array<any> = [];
  tareasComprobadas:Array<any> = [];
  
  tarea:any = {
    name:null,
    description:null,
    date:null,
    task_id:null,
    file:null,
  }


  constructor( private tareaService:TareaService,
               private rankingService:RankingsService,
               public authService:AuthService,
               private router:Router) { }

  ngOnInit(): void { 
    this.recoger()
    this.recogerArchivos(this.authService.user.data[0].id)
  }

  verModificar(id:number){this.ver = false; this.id_task = id}

  cancelarModificar(id:number){this.ver = true; this.id_task = id}
  
  recoger(){

    this.tareaService.recogerTarea(this.rankingService.rankigSelected).subscribe({
        
      next: (value: any) => {
        this.return = value.data;

        for (let i = 0; i < this.return.length; i++) {
          
          this.fechas.push(new Date(this.return[i].date)) 

        }
       
      }
    });
    
  }

  onFileSelected(event:any, task_id:number){
    this.id_task = task_id
    this.file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event:any) => {this.base = reader.result; };    
  }

  entregar(task_id:number,student_id:number){
    this.id_task = 0
    let task = this.base
    let file_name = this.file.name
    let request = {task_id, student_id, task, file_name}


    this.tareaService.entregarTarea(request).subscribe({
        
      next: (value: any) => {
        if(value.status == 1){
          Swal.fire(
            'La entrega se a realizado',
            'La entrega se a realizado correctamente',
            'success'
          )
          this.recogerArchivos(this.authService.user.data[0].id); 
        } else {
          Swal.fire(
            'No se a podido entregar',
            'Pruebe de nuevo',
            'warning'
          )
        }
      }
    });

  }

  actualizar(){

    let task_id = this.id_task
    let task = this.base
    let file_name = this.file.name
    let student_id = this.authService.user.data[0].id

    let request={task_id, task, file_name, student_id}
    
    this.tareaService.modificarArchivos(request).subscribe({
        
      next: (value: any) => {

        if(value.status == 1){
          Swal.fire(
            'Se a actulizado correctamente',
            'La tarea se a actulizado de manera correcta',
            'success'
          )
        this.recogerArchivos(this.authService.user.data[0].id); 
        this.ver = true;this.id_task=0;
        } else {
          Swal.fire(
            'No se a podido actualizar',
            'Intentelo de nuevo',
            'warning'
          )
        }
        
      }
    });

  }

  recogerArchivos(id:number){

    let request = {id}

    this.tareaService.recogerArchivos(request).subscribe({
        
      next: (value: any) => {
        this.entragas = value.data;
        this.comprobarEntregas();
      }
    });

  }

  comprobarEntregas(){

    this.tareasComprobadas = []

    for (let i = 0; i < this.return.length; i++) {
      this.tareasComprobadas.push(
        this.tarea = {
          name: this.return[i].name,
          description: this.return[i].description,
          date: this.return[i].date,
          task_id: this.return[i].id,
          file: null

        }
      )
    }
    for (let i = 0; i < this.tareasComprobadas.length; i++) {
     for (let j = 0; j < this.entragas.length; j++) {

      if(this.tareasComprobadas[i].task_id == this.entragas[j].task_id){

        this.tareasComprobadas[i].file = this.entragas[j].link

      }
     } 
    }
  }

}
