import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public messagesService : MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  ranking(){this.router.navigate(['ranking']); }

  menuRanking(){this.router.navigate(['menuProfessor']); }

  perfil(){this.router.navigate(['perfil']);}

  home(){this.router.navigate(['home']);}

  logout(){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Que quieres cerrar sesión!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        this.messagesService.logout()
        Swal.fire(
          '¡Sesión cerrada!',
          'Tu sesión ha sido cerrada',
          'success'
        )
      }
    })
  }
}
