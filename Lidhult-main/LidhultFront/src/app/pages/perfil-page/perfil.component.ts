import { Router } from '@angular/router';
import { RegisterDataStudent } from './../../model/register-data-student';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from 'src/app/services/character.service';
import Swal from 'sweetalert2';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

file:any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public characterService:CharacterService,
  ) { }

  cambiarContra = true;
  character:any;
  user:RegisterDataStudent = {nick: null,name: null,surnames: null,email: null,password: null,birth_date: null,avatar: null,id: null, character_id: null, password_confirmation: null}
  ancho:any = '80%';

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    date: new FormControl(),
    center: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });
  
  ngOnInit(): void {
    this.recoger_user()
    this.cambiarChar()
    this.characterPefil()

    if(this.authService.user.data[0]['center'] != undefined){
      this.updateForm.setValue({
        
        name: this.authService.user.data[0]['name'],
        surnames: this.authService.user.data[0]['surnames'],
        email: this.authService.user.data[0]['email'],
        date: null,
        center: this.authService.user.data[0]['center'],
        password: "",
        img: "",
      });
    } else {
      let fecha = new Date(this.authService.user.data[0]['birth_date'])
      this.updateForm.setValue({
        
        name: this.authService.user.data[0]['name'],
        surnames: this.authService.user.data[0]['surnames'],
        email: this.authService.user.data[0]['email'],
        date: fecha,
        center: "",
        password: "",
        img: "",
      });
    }

  }

  onFileSelected(event:any) { 

    this.file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event:any) => {this.file = reader.result; };
  }

  update(){
    
    let id = 0;

    if (this.updateForm.controls['name'].value != this.authService.user.data[0]['name']) { this.user['name'] = this.updateForm.controls['name'].value
    } else { this.user['name'] = this.updateForm.controls['name'].value }

    if (this.updateForm.controls['surnames'].value != this.authService.user.data[0]['surnames']) { this.user['surnames'] = this.updateForm.controls['surnames'].value
    } else { this.user['surnames'] = this.updateForm.controls['surnames'].value }

    if (this.updateForm.controls['email'].value != this.authService.user.data[0]['email']) { this.user['email'] = this.updateForm.controls['email'].value
    } else { this.user['email'] = this.updateForm.controls['email'].value }

    if (this.updateForm.controls['email'].value != this.authService.user.data[0]['email']) { this.user['email'] = this.updateForm.controls['email'].value
    } else { this.user['email'] = this.updateForm.controls['email'].value }

    if (this.updateForm.controls['center'].value != "") {
      id = 0; 
      if (this.updateForm.controls['center'].value != this.authService.user.data[0]['center']) { this.user['birth_date'] = this.updateForm.controls['center'].value
      } else { this.user['birth_date'] = this.updateForm.controls['center'].value }
    }

    if (this.updateForm.controls['date'].value != null) {
      id = 1; 
      if (this.updateForm.controls['date'].value != this.authService.user.data[0]['birth_date']) { this.user['birth_date'] = this.updateForm.controls['date'].value
      } else { this.user['birth_date'] = this.updateForm.controls['date'].value }
    }

    if (this.updateForm.controls['password'].value != "") { this.user['password'] = this.updateForm.controls['password'].value
    } else if (this.updateForm.controls['password'].value == ""){ this.user['password'] = '0' }
    this.user['nick'] = this.authService.user.data[0]['nick'];

    this.user['id'] = this.authService.user.data[0]['id']
    if(this.file != undefined){this.user['avatar'] = this.file;}
    else {this.user['avatar'] = ""}

    this.authService.update(this.user).subscribe({
      next: (value: any) => {
        if(value.status == 1){

          Swal.fire(
            'El ususario se ha actualizado',
            '',
            'success'
          )
          
          localStorage.setItem('value', JSON.stringify(value));
          this.authService.user.data[0] = value;
          this.user = value;
          window.location.reload()

        } else {

          Swal.fire(
            'No se a podido actualizar',
            'Pruebelo de nuevo mas tarde',
            'warning'
          )
        }
      

      }
    });
  }

  characterPefil(){
    this.characterService.characterPefil(this.authService.user.data[0].character_id).subscribe({
      next: (value: any) => {
        this.character = value.data.link
        this.router.navigate(['perfil']);

      }
    });
  } 

  cambiarChar(){


    if(this.authService.user.data[0].total_puntuation >= 9000){ this.ancho = '100%' }
    else if(this.authService.user.data[0].total_puntuation >= 6000) {this.ancho = ((this.authService.user.data[0].total_puntuation - 6000) * 100) / 3000 + '%'}
    else if(this.authService.user.data[0].total_puntuation >= 4000) {this.ancho = ((this.authService.user.data[0].total_puntuation - 4000) * 100) / 2000 + '%'}
    else if(this.authService.user.data[0].total_puntuation >= 3000) {this.ancho = ((this.authService.user.data[0].total_puntuation - 3000) * 100) / 1000 + '%'}
    else if(this.authService.user.data[0].total_puntuation >= 2000) {this.ancho = ((this.authService.user.data[0].total_puntuation - 2000) * 100) / 1000 + '%'}
    else if(this.authService.user.data[0].total_puntuation >= 1000) {this.ancho = ((this.authService.user.data[0].total_puntuation - 1000) * 100) / 1000 + '%'}
    else{this.ancho = (this.authService.user.data[0].total_puntuation * 100) / 1000 + '%'}

  }

  changePassword(){ this.cambiarContra = false }

  recoger_user(){

    let id = this.authService.user.data[0].id

    if (this.authService.prof){
      this.authService.recogerProf(id).subscribe({
        next: (value: any) => {
         
        }
      });
    } else {
      this.authService.recogerStud(this.authService.user.data[0].id).subscribe({
        next: (value: any) => {
         
        }
      });
    }  

  }

}
