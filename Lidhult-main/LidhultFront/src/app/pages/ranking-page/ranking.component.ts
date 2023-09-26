import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { RankingsService } from './../../services/rankings.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SkillsService } from 'src/app/services/skills.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  rankings: any;
  nombre: any;
  users: any;
  unirse: boolean = false;
  ver: boolean = false;
  skillPosition:any;
  matTooltip="Sing: {{this.users.signs[j].name}} \nExp: {{this.users.signs[j].puntuation}} \nLvl: {{this.users.signs[j].level}}"

  //CSS
  activeRankingi:string = "active"
  showActiveRanking:string = "show active"
  activeTarea:string = ""
  showActiveTarea:string = ""

  //SOFT KILLS

  responsabilidad:Array<string> = [
    "Habilidad que se refiere a la autodisciplina que se impone para alcanzar una meta, y mantener una actitud que promueva el trabajo y esfuerzo hacia la tarea que se requiere realizar.", 
    "Funciona de manera constante.",
    "Se mantiene conectado a la actividad del grupo.",
    "Hace comentarios o participa en actividades relacionadas con la tarea en cuestión.",
    "Realiza tareas de manera eficiente.",
    "Realiza las tareas con cuidado.",
    "Persevera ante las dificultades.",
    "Respeta las reglas.",
  ]
  cooperación:Array<string> = [
    "La habilidad que incluye comportamientos que facilitan el trabajo en grupo: acciones relacionadas con el compromiso, la escucha activa, la toma de decisiones y la resolución de conflictos.",
    "Escucha a los demás.",
    "Incorpora lo que otros dicen.",
    "Fomenta la participación de los compañeros.",
    "Participa en la toma de decisiones en grupo.",
    "Facilita la resolución de conflictos.",
    "Reconoce sus propias responsabilidades y las de los demás.",
    "Ayuda a sus compañeros desinteresadamente."
  ]
  autonomía:Array<string> = [
    "La autonomía implica trabajar de manera independiente, sin necesidad de supervisión, y pedir ayuda solo cuando se requiere. Iniciativa indica confianza en uno mismo para llevar adelante una tarea o proyecto: dar ideas y buscar soluciones a los problemas cuando sea necesario.",
    "Trae ideas.",
    "Hace preguntas cuando está atascado.",
    "Juega un papel activo en la toma de decisiones del grupo.",
    "Es capaz de convencer a otros de sus enfoques.",
    "Trabaja con determinación.",
    "Cree que puede iniciar cambios.",
  ]
  gestión_emocional:Array<string> = [
    "La capacidad de percibir y aceptar las emociones propias y ajenas con el objetivo de desarrollar habilidades de autogestión efectivas.",
    "Transmite alegría.",
    "Mantiene la calma bajo presión.",
    "Controla las emociones cuando surge un conflicto.",
    "Acepta la posibilidad de cometer errores.",
    "Acepta que sus planteamientos no prosperan.",
    "Adapta el comportamiento a las circunstancias.",

  ]
  habilidades_pensamiento:Array<string> = [
    "Las habilidades de pensamiento permiten procesar la información para construir y organizar el conocimiento, de manera que pueda ser utilizado para resolver problemas en diferentes situaciones. Requieren indagación intelectual, generación de ideas y habilidades de metacognición.",
    "Relaciona los nuevos contenidos con los conocimientos previos.",
    "Hace buenas reflexiones sobre el contenido.",
    "Hace buenas reflexiones sobre los procesos personales internos.",
    "Hace buenas preguntas (para mejorar la comprensión o para avanzar).",
    "Tiene ideas creativas (explora caminos alternativos).",
    "Propone buenas estrategias para la resolución de problemas.",
    "Planifica y prioriza tareas.",
    "Dispuesto a descubrir diferentes perspectivas.",
    "Expresa ideas de forma eficaz (corrección, precisión y estructura).",
  ]
  
  softSkills:Array<string[]> = [this.responsabilidad, this.cooperación, this.autonomía, this.gestión_emocional, this.habilidades_pensamiento]
  softSkill:Array<string> = []
  ////////////

  modalActive:boolean = true

  codeForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  constructor(private rankingsService: RankingsService,
    public authService: AuthService,
    public skillService: SkillsService,
    private router: Router
    ) { }

// 
  ngOnInit(): void {
    this.rankingsUsuarios();
  }
  tooltipContent(index: number): string {
    const sign = this.users.signs[index];
    const content = `
      Sing: ${sign.name}<br>
      Exp: ${sign.puntuation}<br>
      Lvl: ${sign.level}
    `;
    return content;
  }

  verUnirseRanking() { this.unirse = true  }
  volver() {this.ver = false}
  tareas() {this.router.navigate(['tareas'])}
  puntuarSkills(idPuntuado:number) {
    
    this.router.navigate(['puntuar-skills']);
    this.skillService.idStudentPuntuado = idPuntuado 
  
  }

  rankingsUsuarios() {

    this.rankingsService.rankingsUsuarios(this.authService.user.data[0].id).subscribe({

      next: (value: any) => {
        this.rankings = value.data;
      }
    });
  }

  verRanking(id: number) {
    this.rankingsService.rankigSelected = id;
    for (let i = 0; i < this.rankings.length; i++) {
      if (id == this.rankings[i].id) { this.nombre = this.rankings[i].name }
    }

    this.rankingsService.verRankings(id).subscribe({

      next: (value: any) => {
        this.users = value;
        this.ver = true;
      }
    });
  }

  unirseRanking(string: any): any {

    let code = string;
    let student_id = this.authService.user.data[0].id;

    this.rankingsService.unirseRankings(code, student_id).subscribe({

      next: (value: any) => {
        this.users = value;

        if (this.users.status == 1) {
          Swal.fire(
            '¡Sesión cerrada!',
            'Tu sesión ha sido cerrada',
            'success'
          )
        } else {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Probar otra vez'
          }).then((result) => {
            if (result.isConfirmed) {
             this.showModal()
            }
          })
        }
        this.rankingsUsuarios();
      }
    })
  }

  showModal() {
    Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (login != '') {
          this.unirseRanking(login)
        } else {
          Swal.showValidationMessage(
            `El codigo no coincide`
          )
        }

      }
    })
  }

  verModal(skill:number, name:number){

    this.modalActive = false
    this.skillPosition = name
    

    if(skill < 7){this.softSkill = this.softSkills[0]}
    if(skill >= 7 && skill < 13){this.softSkill = this.softSkills[1]}
    if(skill >= 13 && skill < 19){this.softSkill = this.softSkills[2]}
    if(skill >= 19 && skill < 25){this.softSkill = this.softSkills[3]}
    if(skill >= 25 && skill < 31){this.softSkill = this.softSkills[4]}
  

  }
  cerrarModal(){this.modalActive = true}

   //Funcionamiento CSS
   verRankings(){

    this.activeRankingi = "active"
    this.showActiveRanking = "show active"
    this.activeTarea = ""
    this.showActiveTarea = ""

  }

  verTarea(){

    this.activeRankingi = ""
    this.showActiveRanking = ""
    this.activeTarea = "active"
    this.showActiveTarea = "show active"
    
  }
}