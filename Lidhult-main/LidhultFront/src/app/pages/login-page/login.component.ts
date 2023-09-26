import { RegisterDataStudent } from './../../model/register-data-student';
import { MessagesService } from './../../services/messages.service';
import { LoginData } from './../../model/login-data';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({

    text: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  datos: LoginData = {
    dato: null,
    password: null
  };
  objetoJSON:any
  token:any
  user: RegisterDataStudent = {nick: null, name: null, surnames: null, email: null, password: null, birth_date: null, avatar: null,id: null, character_id: null, password_confirmation: null}
  constructor(

    public authService: AuthService,
    public messageService: MessagesService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {

    this.authService.status = 0

    if(localStorage.getItem('access_token') != null){
      
      this.authService.autoLogin(localStorage.getItem('access_token')).subscribe({

        next: (value: any) => {

          this.datos = value;
          if(value.data[0].center != null || value.data[0].center != undefined){

            this.router.navigate(['menuProfessor']);

          } else {

            this.router.navigate(['ranking']);

          }
  
        }
      });
    }
   }

  register() { 
    
    this.authService.prof = true
    this.authService.stud = true
    this.router.navigate(['register']); 

  
  }

  login() {


    this.datos['dato'] = this.loginForm.controls['text'].value;
    this.datos['password'] = this.loginForm.controls['password'].value;


    this.authService.login(this.datos).subscribe({

      next: (value: any) => { 

        this.datos = value;
        const token = value.access_token;
        
        localStorage.setItem('access_token', token);
        localStorage.setItem('status', '1');
        localStorage.setItem('value', JSON.stringify(value));

        if(this.authService.user.data[0].center != undefined){ this.authService.prof = true } else  { this.authService.stud = true }
 
        if (value['status'] == 0) {
          this.router.navigate(['login']);
        } else {
          if(value.data[0].center != null || value.data[0].center != undefined){

            this.router.navigate(['menuProfessor']);

          } else {

            this.router.navigate(['ranking']);

          }
        }

      }
    });
  }

 
  cerrar() { this.messageService.mensajeLogin = true }

}
