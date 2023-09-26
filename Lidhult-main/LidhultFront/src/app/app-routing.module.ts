import { SolicitudesProfesorComponent } from './pages/solicitudes-profesor/solicitudes-profesor.component';
import { TareasAlumnosComponent } from './pages/tareas-alumnos/tareas-alumnos.component';
import { PuntuarTareaComponent } from './pages/puntuar-tarea/puntuar-tarea.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { ModificarRankingComponent } from './pages/modificar-ranking/modificar-ranking.component';
import { MenuProfessorComponent } from './pages/menu-professor/menu-professor.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-page/login.component';
import { PerfilComponent } from './pages/perfil-page/perfil.component';
import { RegisterComponent } from './pages/register-page/register.component';
import { SelectComponent } from './pages/select/select.component';
import { RankingComponent } from './pages/ranking-page/ranking.component';
import { HomeComponent } from './pages/home-page/home.component';
import { CharacterComponent } from './pages/character-page/character.component';
import { PuntuarSkillsComponent } from './pages/puntuar-skills/puntuar-skills.component';
import { HistorialInsigniasComponent } from './pages/historial-insignias/historial-insignias.component';

const routes: Routes = [

  {path: 'login',
  component: LoginComponent},
  {path: 'select',
  component: SelectComponent},
  {path: 'register',
  component:  RegisterComponent},
  {path: 'character',
  component: CharacterComponent},
  {path: 'ranking',
  component: RankingComponent,
  canActivate: [AuthGuard]},
  {path: 'home',
  component: HomeComponent, 
  canActivate: [AuthGuard]},
  {path: 'perfil',
  component: PerfilComponent,
  canActivate: [AuthGuard]},
  {path: 'menuProfessor',
  component: MenuProfessorComponent,
  canActivate: [AuthGuard]},
  {path: 'modificarRanking',
  component: ModificarRankingComponent,
  canActivate: [AuthGuard]},
  {path: 'tarea',
  component: TareaComponent,
  canActivate: [AuthGuard]},
  {path: 'puntuar-tarea',
  component: PuntuarTareaComponent,
  canActivate: [AuthGuard]},
  {path: 'tareas',
  component: TareasAlumnosComponent,
  canActivate: [AuthGuard]},
  {path: 'puntuar-skills',
  component: PuntuarSkillsComponent,
  canActivate: [AuthGuard]},
  {path: 'solicitudes',
  component: SolicitudesProfesorComponent,
  canActivate: [AuthGuard]},
  {path: 'historial-insignias',
  component: HistorialInsigniasComponent,
  canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
