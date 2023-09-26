import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RankingsService } from 'src/app/services/rankings.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-professor',
  templateUrl: './menu-professor.component.html',
  styleUrls: ['./menu-professor.component.css']
})
export class MenuProfessorComponent implements OnInit {

  //TS
  rankings: any;
  rank_id: number = 0;
  verCrear: boolean = true;
  verModificar: boolean = true;

  //CSS
  activeRankingi: string = "active"
  showActiveRanking: string = "show active"
  activeTarea: string = ""
  showActiveTarea: string = ""
  activePuntuarTarea: string = ""
  showActivePuntuarTarea: string = ""
  activeSolicitudes: string = ""
  showActiveSolicitudes: string = ""
  activeHistorialIng: string = ""
  showActiveHistorialIng: string = ""

  //FUNCIONES TS

  newRanking = new FormGroup({ name: new FormControl('', [Validators.required]) });

  constructor(public rankingsService: RankingsService,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void { this.rankingsUsuarios(); }

  showModal() {

    Swal.fire({
      title: 'Introduce el nombre del Ranking que quieras crear:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {

        if (login != '') {
          this.createRanking(login)
        } else {
          Swal.showValidationMessage(
            `El codigo no coincide`
          )
        }

      }
    })
  }

  verCrearRanking(): void { this.verCrear = false }

  verModificarRanking(id: number, name: string): void {

    this.verModificar = false
    this.rank_id = id;
    this.newRanking.setValue({ name: name });

  }

  cancelarModificarRanking(): void {

    this.verModificar = true;
    this.newRanking.setValue({ name: '' });

  }

  modificarRanking() { this.route.navigate(['modificarRanking']) }

  tarea() { this.route.navigate(['tarea']) }

  puntuarTarea() { this.route.navigate(['puntuar-tarea']) }

  solicitudes() { this.route.navigate(['solicitudes']) }

  historialInsignias() { this.route.navigate(['historial-insignias']) }

  volver() {
    this.rankingsService.ver = false
  }

  ranking(id: number) {

    this.rankingsService.ver = true;
    this.rankingsService.rankigSelected = id;
  }

  rankingsUsuarios() {

    this.rankingsService.rankingsProfesor(this.authService.user.data[0].id).subscribe({

      next: (value: any) => {
        this.rankings = value.data;
      }
    });
  }

  eliminarRanking(id: number) {

    Swal.fire({
      title: 'Estas seguro de que quiere eliminar el Ranking?',
      showDenyButton: true,
      confirmButtonText: 'Si!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.rankingsService.eliminarRanking(id).subscribe({

          next: (value: any) => {

            if (value.status == 1) {
              Swal.fire(
                'Ha sido un exito!',
                'Ranking eliminado!',
                'success'
              )
              this.rankingsUsuarios();
              this.rankingsService.ver = false


            } else {

              Swal.fire(
                'Ha habido algun error',
                'Porvafor vuelva a intentarlo mas tarde',
                'warning'
              )

            }

          }
        });
      }
    })
  }

  cambiarCodigo(id: number) {

    this.rankingsService.cambiarCodigo(id).subscribe({

      next: (value: any) => {

        if (value) {

          Swal.fire({
            title: 'El codigo a sido reiniciado con extido',
            icon: 'success',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.rankingsUsuarios();
              this.rankingsService.ver = false
              window.location.reload();
            }
          });
        

        } else {

          Swal.fire(
            'El codigo se a cambiado con exito',
            '',
            'warning'
          )

        }

      }
    });
  }

  createRanking(data:any) {

    let name = data
    let id = this.authService.user.data[0].id

    this.rankingsService.crearRanking(name, id).subscribe({

      next: (value: any) => {

        if (value.status == 1) {
          Swal.fire(
            'A sido un exito',
            'Ranking creado correctamente',
            'success'
          )
          this.rankingsUsuarios();
          this.verCrear = true;
          this.newRanking.setValue({ name: '' });

        } else {

          Swal.fire(
            'A sido un desastre',
            'No se a creado el Ranking',
            'warning'
          )
        }
      }
    });
  }

  actualizarRanking(id: number) {

    let name = this.newRanking.controls['name'].value

    this.rankingsService.actualizarRanking(name, id).subscribe({

      next: (value: any) => {

        if (value.status == 1) {
          Swal.fire(
            'Se a actulizado con extio',
            'El nombre a sido actualizado',
            'success'
          )
          this.rankingsUsuarios();
          this.verModificar = true;
          this.newRanking.setValue({ name: '' });

        } else {

          Swal.fire(
            'El nombre no se a actualizado.',
            'Compruebe que  todos los campos han sido rellenados',
            'warning'
          )

        }

      }

    });
  }

  //Funcionamiento CSS
  verRanking() {

    this.activeRankingi = "active"
    this.showActiveRanking = "show active"
    this.activeTarea = ""
    this.showActiveTarea = ""
    this.activePuntuarTarea = ""
    this.showActivePuntuarTarea = ""
    this.activeSolicitudes = ""
    this.showActiveSolicitudes = ""
    this.activeHistorialIng = ""
    this.showActiveHistorialIng = ""

  }

  verTarea() {

    this.activeRankingi = ""
    this.showActiveRanking = ""
    this.activeTarea = "active"
    this.showActiveTarea = "show active"
    this.activePuntuarTarea = ""
    this.showActivePuntuarTarea = ""
    this.activeSolicitudes = ""
    this.showActiveSolicitudes = ""
    this.activeHistorialIng = ""
    this.showActiveHistorialIng = ""

  }

  verPuntuarTarea() {

    this.activeRankingi = ""
    this.showActiveRanking = ""
    this.activeTarea = ""
    this.showActiveTarea = ""
    this.activePuntuarTarea = "active"
    this.showActivePuntuarTarea = "show active"
    this.activeSolicitudes = ""
    this.showActiveSolicitudes = ""
    this.activeHistorialIng = ""
    this.showActiveHistorialIng = ""

  }

  verSolicitudes() {

    this.activeRankingi = ""
    this.showActiveRanking = ""
    this.activeTarea = ""
    this.showActiveTarea = ""
    this.activePuntuarTarea = ""
    this.showActivePuntuarTarea = ""
    this.activeSolicitudes = "active"
    this.showActiveSolicitudes = "show active"
    this.activeHistorialIng = ""
    this.showActiveHistorialIng = ""

  }

  verHistorialIng() {

    this.activeRankingi = ""
    this.showActiveRanking = ""
    this.activeTarea = ""
    this.showActiveTarea = ""
    this.activePuntuarTarea = ""
    this.showActivePuntuarTarea = ""
    this.activeSolicitudes = ""
    this.showActiveSolicitudes = ""
    this.activeHistorialIng = "active"
    this.showActiveHistorialIng = "show active"

  }

  copiarTexto() {

    const textoACopiar = document.getElementById('texto-a-copiar')?.textContent;
  if (textoACopiar) {
    navigator.clipboard.writeText(textoACopiar).then(() => {
    }).catch((error) => {
    });
  }

  }
}
