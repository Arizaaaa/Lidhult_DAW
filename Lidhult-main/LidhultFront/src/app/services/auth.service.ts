import { LoginData } from './../model/login-data';
import { RegisterDataStudent } from './../model/register-data-student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { catchError, filter, Observable, throwError, timer } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {                                                                                                                                                

  readonly registeStudentrUrl = "http://localhost:8000/api/createStudent"
  readonly registeProfessorUrl = "http://localhost:8000/api/createProfessor"
  readonly loginUrl = "http://localhost:8000/api/login"
  readonly updateStudentUrl = "http://localhost:8000/api/updateStudent"
  readonly takeStudentUrl = "http://localhost:8000/api/readStudent"
  readonly takeProfessorUrl = "http://localhost:8000/api/readProfessor"
  readonly updateProfessorUrl = "http://localhost:8000/api/updateProfessor"
  readonly autoLoginUrl = "http://localhost:8000/api/autoLogin"
  status:any;
  user : any;
  prof = false;
  stud = false;
  password : any;

  constructor(public http: HttpClient, public router:Router) { }

  recarga(){

    this.autoLogin(localStorage.getItem('access_token')).subscribe({

      next: (value: any) => {
        this.user = value
        if (value.status == 1) {
          
          this.user = value


        } else {

          this.router.navigate(['login']);

        }

      }
    });

  }

  registerStudent(student:RegisterDataStudent) : Observable<RegisterDataStudent>{
    
    this.password = student['password']
    return this.http.post<RegisterDataStudent>(this.registeStudentrUrl, student).pipe(
      catchError(error => {
        
        Swal.fire(
          'Error al registrarse',
          'El nick o el correo ya existen',
          'warning'
        )
        
      this.router.navigate(['register'])        
      return error;

    }),
      filter((value: any) => {
        let found = false;

        if(value != null){ found = true} 
        else{found = false}

        this.status = value['status'];
        this.user = value;
        return found
        })
    );
  }
  registerProfessor(professor:RegisterDataStudent) : Observable<RegisterDataStudent>{
    
    this.password = professor['password']
    return this.http.post<RegisterDataStudent>(this.registeProfessorUrl, professor).pipe(
      catchError(error => {
        
          Swal.fire(
            'Error al registrarse',
            'El nick o el correo ya existen',
            'warning'
          )
          
        this.router.navigate(['register'])        
        return error;

      }),
      filter((value: any) => {
        let found = false;
        if (value != null) {
          found = true
        } else {
          found = false
        }
        this.status = value['status'];
        this.user = value;
        return found;
      })
    );
  }

  update(request:RegisterDataStudent) : Observable<any>{

    if (this.prof) {
      
      return this.http.post<any>(this.updateProfessorUrl, request).pipe(
        filter((value: any) => {
          let found = false;
          if(value != null){

            this.recogerProf(request.nick).subscribe({
              next: (value: any) => {
                this.user = value
              }
            });

            found = true
          }else{
            found = false
          }
          return found
          })
      );

    } else {

      return this.http.post<any>(this.updateStudentUrl, request).pipe(
        
        filter((value: any) => {
          
          let found = false;
          
          if(value != null){
            found = true
          }else{
            found = false
          }
          return found
          })
      );
      }
    }
    


  autoLogin(access_token:any) : Observable<any>{
    
     let request = {access_token}

     
    return this.http.post<LoginData>(this.autoLoginUrl, request).pipe(
      filter((value: any) => {
        let found = false;
        if(value != null){
          found = true
        }else{
          found = false
        }
        if(value.data[0].center == undefined){ this.prof= false }
        else {this.stud = false}
        this.status = value['status'];
        this.user = value;
        return found
        })
    );
  }

  login(data:any) : Observable<LoginData>{
    
    return this.http.post<LoginData>(this.loginUrl, data).pipe(
    filter((value: any) => {  
        if(value.status == 0) {

          Swal.fire(
            'Error al loguearse',
            'Las credenciales no coinciden',
            'warning'
          )
          
        this.router.navigate(['login'])       

        }

        let found = false;

        if(value != null){
          found = true
        }else{
          found = false
        }

        if(value.data[0].center == undefined){ this.prof= false }
        else {this.stud = false}
       

        this.status = value['status'];
        this.user = value;
        return found
        })

    );
  }

  recogerProf(id:any) : Observable<any>{

    let request = {id}

    return this.http.post<any>(this.takeProfessorUrl,request).pipe(
      filter((value: any) => {

        let found = false;
        if(value != null){
          found = true
        }else{
          found = false
        }
        return found
        })
    );

  }

  recogerStud(id:any) : Observable<any>{

    let request = {id}
   
    return this.http.post<any>(this.takeStudentUrl, request).pipe(
      filter((value: any) => {

        let found = false;
        if(value != null){
          found = true
        }else{
          found = false
        }
        return found
        })
    );
    
  }
  elegirProf(){ this.prof = false;}
  elegirStud(){ this.stud = false;}

}
