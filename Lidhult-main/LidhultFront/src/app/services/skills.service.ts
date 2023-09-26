import { RankingsService } from 'src/app/services/rankings.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    public http: HttpClient,
    public rankingsService:RankingsService,
    public authService:AuthService

    ) { }

  idStudentPuntuado:any

  readonly readSkills  = "http://localhost:8000/api/indexSkills"
  readonly updateSkills  = "http://localhost:8000/api/updateSkills"
  readonly indexHistorial  = "http://localhost:8000/api/index"
  readonly deleteHistorial  = "http://localhost:8000/api/deleteRecord"
  readonly filterHistorial  = "http://localhost:8000/api/filterIndex"

  recogerSkills(student_id:any,ranking_id:any) : Observable<any>{

    ranking_id = this.rankingsService.rankigSelected
    let evaluator = this.authService.user.data[0].id
    let request = {student_id, ranking_id,evaluator}

    return this.http.post<any>(this.readSkills,request).pipe(
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

  actualizarSkills(sign_id:number, last_evaluator:number, student_id:number, ranking_id:number, puntuation:number) : Observable<any>{
      
    let request = {sign_id, last_evaluator, student_id, ranking_id, puntuation}

    return this.http.post<any>(this.updateSkills,request).pipe(
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

  recogerHistorial(ranking_id:number) : Observable<any>{
      
    let request = {ranking_id}

    return this.http.post<any>(this.indexHistorial,request).pipe(
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

  borrarHistorial(evaluator:number, evaluated:number, sign_id:number, ranking_id:number, points:number, created_at:Date) : Observable<any>{
      
    let request = {evaluator ,evaluated ,sign_id ,ranking_id ,points ,created_at}

    return this.http.post<any>(this.deleteHistorial,request).pipe(
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

  filtrarHistorial(request:any) : Observable<any>{
      
    return this.http.post<any>(this.filterHistorial,request).pipe(
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
