import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { RankingsService } from './rankings.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  mensajeLogout = true;
  mensajeLogin = true;
  mensajeRegister = true;
  readonly recogerSolicitudes = "http://localhost:8000/api/showRequest/"
  readonly denegarSolicitudes = "http://localhost:8000/api/deleteRequest/"


  constructor(
    public authService:AuthService,
    private rankingService:RankingsService,
    private router:Router,
    private http:HttpClient
    ) { }

  logoutMessage(){ this.mensajeLogout = false;}

  logout(){

    localStorage.removeItem('access_token');
    localStorage.removeItem('value');
    localStorage.removeItem('status');

    this.authService.status = 0; 
    this.authService.stud = true;
    this.authService.prof = true;
    this.router.navigate(['login']);
  }

  loginFail(){ this.mensajeLogin = false }

  registerFail(){ this.mensajeRegister = false }

  recogerSolicitud(ranking_id:number) : Observable<any>{

    let request = {ranking_id}

    return this.http.post<any>(this.recogerSolicitudes,request).pipe(
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

  denegarSolicitud(ranking_id:number,student_id:number) : Observable<any>{

    let request = {ranking_id,student_id}

    return this.http.post<any>(this.denegarSolicitudes,request).pipe(
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
