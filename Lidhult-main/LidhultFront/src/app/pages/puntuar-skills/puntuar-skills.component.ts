import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingsService } from 'src/app/services/rankings.service';
import { SkillsService } from 'src/app/services/skills.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntuar-skills',
  templateUrl: './puntuar-skills.component.html',
  styleUrls: ['./puntuar-skills.component.css']
})
export class PuntuarSkillsComponent implements OnInit {

  constructor(
    public skillsService:SkillsService,
    public authService:AuthService,
    public rankingService:RankingsService,
    private router:Router
  ) { }

    signs:FormGroup = new FormGroup ({
      responsabilidad: new FormControl(0,[Validators.min(0)]),
      cooperación: new FormControl(0,[Validators.min(0)]),
      autonomia: new FormControl(0,[Validators.min(0)]),
      gestion_emocional: new FormControl(0,[Validators.min(0)]),
      habilidades_pensamiento: new FormControl(0,[Validators.min(0)]),

    })
    formName:Array<any> = ["responsabilidad","cooperación","autonomia","gestion_emocional","habilidades_pensamiento"]
    skills:any
    name:string|undefined

  ngOnInit(): void {

    this.readSkills()

    this.signs.setValue({
        
      responsabilidad: 0,
      cooperación: 0,
      autonomia: 0,
      gestion_emocional: 0,
      habilidades_pensamiento: 0,
     
    });
  }

  volver(){this.router.navigate(['ranking']); }

  readSkills(){
    if (this.rankingService.rankigSelected == undefined || this.rankingService.rankigSelected == null) {this.router.navigate(['ranking']);}
    
    this.skillsService.recogerSkills(this.skillsService.idStudentPuntuado, this.rankingService.rankigSelected).subscribe({
        
      next: (value: any) => {
        this.skills = value.data;
        this.name = this.skills[0].student
      }
    });

  }

  actualizarSkills(){

    let status
    let puntos = [this.signs.controls['responsabilidad'].value, 
    this.signs.controls['cooperación'].value, 
    this.signs.controls['autonomia'].value,
    this.signs.controls['gestion_emocional'].value,
    this.signs.controls['habilidades_pensamiento'].value]

    for (let i = 0; i < this.skills.length; i++) {
            
      if(puntos[i] != 0) {
        status = 1
        this.skillsService.actualizarSkills(this.skills[i].sign_id, this.authService.user.data[0].id,
                                            this.skillsService.idStudentPuntuado, this.rankingService.rankigSelected,puntos[i]  
                                            ).subscribe({

          next: (value: any) => {

            status = value.status
          }
        });
      }
      }
      if (status == 1) {

              Swal.fire(
                'Se han sumado correctamente',
                '',
                'success'
              )
              this.ngOnInit() 
            } else {
              Swal.fire(
                'No se a podido sumar',
                'Pruebelo de nuevo mas tarde',
                'warning'
              )
            }
    }
    
}
