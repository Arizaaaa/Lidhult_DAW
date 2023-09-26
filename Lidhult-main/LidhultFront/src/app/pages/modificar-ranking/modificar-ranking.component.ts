import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RankingsService } from 'src/app/services/rankings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-ranking',
  templateUrl: './modificar-ranking.component.html',
  styleUrls: ['./modificar-ranking.component.css']
})
export class ModificarRankingComponent implements OnInit {

  users:any;
  id:any;
  ver:boolean = false;
  verAlerta:boolean = false;
  stud_id:any;
  rank_id:any;
  listaUsuariosUpdate: Array<number> = [];
  bonus = new FormGroup({bonus: new FormControl('')  });
  puntos = new FormGroup({puntos: new FormControl('')  });

  constructor( private rankingsService:RankingsService,
               private authService:AuthService,     
               private router: Router) { }

  ngOnInit(): void {this.verRanking();}
  
  volver(){this.router.navigate(['menuProfessor'])}

  cerrar(){this.verAlerta = false}

  verRanking(){
  
    this.rankingsService.verRankingsOrdenado(this.rankingsService.rankigSelected).subscribe({
        
      next: (value: any) => {
        this.users = value;
        this.ver = true;
      }
    });
  }

  eliminarUser(stud_id:any, rank_id:any, entrar:number){
  
    this.stud_id = stud_id
    this.rank_id = rank_id

      Swal.fire({
        title: '¿Estás seguro de que quieres eliminar el usuario?',
        showDenyButton: true,
        confirmButtonText: 'Sí!',
        denyButtonText: `No!`,
      }).then((result) => {

        if (result.isConfirmed) {

          this.rankingsService.eliminarAlumno(rank_id, stud_id).subscribe({
        
            next: (value: any) => {

              if(value.status == 1){
                Swal.fire(
                  'Usuario eliminado',
                  'Has eliminado el usuario del ranking',
                  'success'
                )
                this.users = value;
                this.ver = true;
                this.verAlerta = false;
                this.verRanking()
      
              } else {
       
                Swal.fire(
                  'No se a podido eliminar',
                  'Pruebelo de nuevo mas tarde',
                  'warning'
                )
      
              }
            }
          });
        }
      })
  }

  guardar(student_id:any, ranking_id:any, puntuation:number, puntosNuevos?:any, bonus?:any){

      if(puntosNuevos == "") { puntosNuevos = 0}
      if(bonus == "") { bonus = 0}
      
      puntuation += parseInt(puntosNuevos) + parseInt(bonus) 

      this.rankingsService.sumarAlumno(ranking_id, student_id, puntuation).subscribe({
          
        next: (value: any) => {
          if(value.status == 1){
            Swal.fire(
              'Puntuación Guardada',
              'La puntuación ha sido modificada',
              'success'
            )
            this.users = value;
            this.ver = true;
            this.bonus.setValue({bonus:'0'});
            this.puntos.setValue({puntos:'0'});
            this.verRanking()
  
          } else {
   
            Swal.fire(
              'No se a podido guardar',
              'Pruebelo de nuevo mas tarde',
              'warning'
            )
  
          }

        }
      });
  }

  anadirLista(id:any){

    let cont = 0;
    for (let i = 0; i < this.listaUsuariosUpdate.length; i++) {
      if (this.listaUsuariosUpdate[i] == id ){ 
        cont += 1; 
        this.listaUsuariosUpdate.splice(i,1)
      }
    }

    if(cont == 0){ this.listaUsuariosUpdate.push(id) }
  }

  suamrPuntosLista(puntos:string){

    let ranking_id = this.rankingsService.rankigSelected
    
    for (let i = 0; i < this.listaUsuariosUpdate.length; i++) {
      let puntuation = parseInt(puntos);
      for (let j = 0; j < this.users.data.length; j++) {
        
        if (this.users.data[j].id == this.listaUsuariosUpdate[i]) {

          puntuation = parseInt(this.users.data[j].puntuation) + parseInt(puntos)

          this.rankingsService.sumarAlumno(ranking_id, this.listaUsuariosUpdate[i], puntuation).subscribe({
      
            next: (value: any) => {

              if(value.status == 1){
                
                this.users = value;
                this.listaUsuariosUpdate = [];
                this.verRanking()
              } else {
       
              }
            }
          });
        }
      } 
    }

    Swal.fire(
      'Puntuación Guardada',
      'La puntuación ha sido modificada',
      'success'
    )
    
  }
  
}
