import { Router } from '@angular/router';
import { RegisterDataStudent } from './../../model/register-data-student';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public status = 0; 
  pasar = true;
  profesor = true;

  student: RegisterDataStudent = {nick: null, email: null, name: null, surnames: null, password: null, birth_date: null, avatar: null,id: null, character_id: null, password_confirmation: null};

  registerForm = new FormGroup({
    nick: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    con: new FormControl('', [Validators.required]),
    conValidate: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  }, [this.passwordMatch('con','conValidate')]);

  constructor(
    public authService: AuthService,
    public messageService: MessagesService,
    private router: Router

    ) { 
  }
  ngOnInit(): void {
    
      this.authService.prof = true
      this.authService.stud = true
    this.authService.status = 0

  }


  login(){this.router.navigate(['perfil']); }
  
  selector(){ 

    this.authService.prof = true
    this.authService.stud = true
     
    this.router.navigate(['register']); 
  }

  nickValidator(){

    let specialCaracters = '!"·$%&/()=?¿^*Ç¨;:|@#~¬¡´`+-.,><}{][\ºª'
    let comilla = "'"
    let str = this.registerForm.controls['nick'].value

    for (let index = 0; index < specialCaracters.length; index++) {      
      if (str?.includes(specialCaracters[index]) || str?.includes(comilla[index])) {
        this.messageService.mensajeRegister = false
     }
    }
  }

  passwordMatch(password:string, passwordVal:string){

    return function(form:AbstractControl){
      const val = form.get(password)?.value
      const confirmVal = form.get(passwordVal)?.value

      if(val === confirmVal){
        return null;
      }

      if(confirmVal != ''){
        return {passwordMismatchError:true}
      } else {
        return {passwordMismatchError:false}
      }


    }

  }

  register(){
    this.nickValidator();
    if(this.registerForm.controls['con'].value == this.registerForm.controls['conValidate'].value && this.messageService.mensajeRegister == true){
      if(this.authService.stud){

          this.student['nick'] = this.registerForm.controls['nick'].value;
          this.student['email'] = this.registerForm.controls['email'].value
          this.student['name'] = this.registerForm.controls['name'].value
          this.student['surnames'] = this.registerForm.controls['surname'].value
          this.student['password'] = this.registerForm.controls['con'].value
          this.student['password_confirmation'] = this.registerForm.controls['conValidate'].value
          this.student['birth_date'] = this.registerForm.controls['date'].value!.toString()

          this.authService.user = this.student

          this.router.navigate(['character']);
        
      } else {
        
        if(this.registerForm.controls['con'].value == this.registerForm.controls['conValidate'].value){

          this.student['nick'] = this.registerForm.controls['nick'].value;
          this.student['email'] = this.registerForm.controls['email'].value
          this.student['name'] = this.registerForm.controls['name'].value
          this.student['surnames'] = this.registerForm.controls['surname'].value
          this.student['password'] = this.registerForm.controls['con'].value
          this.student['password_confirmation'] = this.registerForm.controls['conValidate'].value
          this.student['birth_date'] = this.registerForm.controls['date'].value!.toString()

          this.authService.user = this.student

          this.router.navigate(['character']);
          
      }
      }
    }
  }
  comprobacionRegister(value:any){ 
    
    if (value['status'] == 0){ 

      this.messageService.registerFail() 
      
    } else {

        this.router.navigate(['character']);
    }
  }

  cerrar(){ this.messageService.mensajeRegister = true }

}
