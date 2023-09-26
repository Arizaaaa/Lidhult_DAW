import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RankingsService } from 'src/app/services/rankings.service';
import { SkillsService } from 'src/app/services/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-insignias',
  templateUrl: './historial-insignias.component.html',
  styleUrls: ['./historial-insignias.component.css']
})
export class HistorialInsigniasComponent implements OnInit {

  constructor(
    private rankingsService: RankingsService,
    public authService: AuthService,
    public skillService: SkillsService,
  ) { }

  historial:any

  evaluator:any
  evaluated:any
  skillName:any
  firstDate:any
  lastDate:any
  event:Event | null | undefined

  ngOnInit(): void {

    this.recogerHistorial()

  }

  recogerHistorial() {

    this.skillService.recogerHistorial(this.rankingsService.rankigSelected).subscribe({

      next: (value: any) => {
        this.historial = value.data
      }
    });

  }

  filtrar() {

    
    let ranking_id = this.rankingsService.rankigSelected
    let last_evaluator = this.evaluator
    let student_id = this.evaluated
    let soft_skills = this.skillName
    let date1 = this.firstDate
    let date2 = this.lastDate

    let request = { ranking_id, last_evaluator, student_id, soft_skills, date1, date2 }

    this.skillService.filtrarHistorial(request).subscribe({

      next: (value: any) => {
        this.historial = value.data
      }
    });
  
  }

  borrar(info:any){


    Swal.fire({
      title: 'Estas seguro de que quiere eliminar el registro?',
      showDenyButton: true,
      confirmButtonText: 'Si!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.skillService.borrarHistorial(info.evaluator, info.evaluated, info.sign_id, info.ranking_id, info.points, info.created_at).subscribe({

          next: (value: any) => {

            if (value.status == 1) {
              Swal.fire(
                'Ha sido un exito!',
                'Puntuacion eliminada!',
                'success'
              )


            } else {

              Swal.fire(
                'Ha habido algun error',
                'Porvafor vuelva a intentarlo mas tarde',
                'warning'
              )

            }
            this.historial = value.data
            this.ngOnInit()
          }
        });

    
      }
    })

  }

}
