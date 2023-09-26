import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login-page/login.component';
import { PerfilComponent } from './pages/perfil-page/perfil.component';
import { RegisterComponent } from './pages/register-page/register.component';
import { SelectComponent } from './pages/select/select.component';
import { HeaderComponent } from './pages/header/header.component';
import { RankingComponent } from './pages/ranking-page/ranking.component';
import { CharacterComponent } from './pages/character-page/character.component';
import { HomeComponent } from './pages/home-page/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MenuProfessorComponent } from './pages/menu-professor/menu-professor.component';
import { ModificarRankingComponent } from './pages/modificar-ranking/modificar-ranking.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { PuntuarTareaComponent } from './pages/puntuar-tarea/puntuar-tarea.component';
import { TareasAlumnosComponent } from './pages/tareas-alumnos/tareas-alumnos.component';
import { SolicitudesProfesorComponent } from './pages/solicitudes-profesor/solicitudes-profesor.component';
import { PuntuarSkillsComponent } from './pages/puntuar-skills/puntuar-skills.component';
import { HistorialInsigniasComponent } from './pages/historial-insignias/historial-insignias.component';
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    SelectComponent,
    HeaderComponent,
    RankingComponent,
    SelectComponent,
    HeaderComponent,
    CharacterComponent,
    HomeComponent,
    MenuProfessorComponent,
    ModificarRankingComponent,
    SidebarComponent,
    TareaComponent,
    PuntuarTareaComponent,
    TareasAlumnosComponent,
    SolicitudesProfesorComponent,
    PuntuarSkillsComponent,
    HistorialInsigniasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTooltipModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
       
      }
    })
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
