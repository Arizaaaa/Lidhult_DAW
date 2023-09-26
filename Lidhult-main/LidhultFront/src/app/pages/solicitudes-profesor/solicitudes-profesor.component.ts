import { RankingsService } from 'src/app/services/rankings.service';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-profesor',
  templateUrl: './solicitudes-profesor.component.html',
  styleUrls: ['./solicitudes-profesor.component.css']
})
export class SolicitudesProfesorComponent implements OnInit {

  constructor( 
    private messageService:MessagesService,
    private rankingService:RankingsService
    ) { }

  solicitudes:any

  ngOnInit(): void {this.recoger()}

  recoger(){
    this.messageService.recogerSolicitud(this.rankingService.rankigSelected).subscribe({

      next: (value: any) => {
      this.solicitudes = value.data
      }
    });
  }

  denegar(student_id:number){

    let ranking_id = this.rankingService.rankigSelected

    this.messageService.denegarSolicitud(ranking_id,student_id).subscribe({

      next: (value: any) => {

        Swal.fire({
          title: 'Cancelas el accso al ranking a este usuario?',
          showDenyButton: true,
          confirmButtonText: 'Si!',
          denyButtonText: ` No!`,
        }).then((result) => {
  
          if (result.isConfirmed) {

            if(value.status == 1){
              Swal.fire(
                'Solicitud denegado con exito',
                'Exito al denegar la solicitud',
                'success'
              )
              this.recoger()
              
    
            } else {
      
              Swal.fire(
                'Ha habido algun problema',
                'No se a podido denegar la solicitud',
                'warning'
              )
    
            }
          }
        })

      }
    });

  }
  aceptar(student_id:number){

    let ranking_id = this.rankingService.rankigSelected

    this.rankingService.createAlumno(ranking_id,student_id).subscribe({

      next: (value: any) => {

        Swal.fire({
          title: 'Quieres permitir que el usuario entre al Ranking?',
          showDenyButton: true,
          confirmButtonText: 'Si!',
          denyButtonText: `No!`,
        }).then((result) => {
  
          if (result.isConfirmed) {

            if(value.status == 1){
              Swal.fire(
                'Bien, el usuario ya esta dentro',
                'La solicutud se a aceptado correctamente',
                'success'
              )
              this.messageService.denegarSolicitud(ranking_id,student_id).subscribe({next: (value: any) => {}});
              this.recoger()  
    
            } else {
      
              Swal.fire(
                'Ha habido algun problema',
                'No se a podido aceptar la solicitud',
                'warning'
              )
    
            }
          }
        })
       
      }
    });

  }
}
