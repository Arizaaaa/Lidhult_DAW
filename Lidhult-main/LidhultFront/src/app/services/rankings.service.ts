import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  constructor(public http: HttpClient) { }

  showRankingsUrl:any
  showRankingUrl:any
  sendRequestUrl:any
  rankigSelected:any
  deleteStudentRank:any
  deleteRanking:any
  createRanking:any
  updateRanking:any
  updateTotalRanking:any
  añadirUsuarioRanking:any
  changeCode:any
  ver:boolean = false
  
  rankingsUsuarios(id:number) : Observable<any>{
   this.showRankingsUrl = "http://localhost:8000/api/showStudentRanking/"+id
    
    return this.http.get<any>(this.showRankingsUrl).pipe(
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

  rankingsProfesor(id:number) : Observable<any>{

    this.showRankingsUrl = "http://localhost:8000/api/showProfessorRanking/"+id
     
     return this.http.get<any>(this.showRankingsUrl).pipe(
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

  verRankings(ranking_id:number) : Observable<any>{
    this.showRankingUrl = "http://localhost:8000/api/indexUsers/"
    
    let request = {ranking_id}

     return this.http.post<any>(this.showRankingUrl,request).pipe(
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

   verRankingsOrdenado(id:number) : Observable<any>{
    this.showRankingUrl = "http://localhost:8000/api/indexUsersUuu/"+id
     
     return this.http.get<any>(this.showRankingUrl).pipe(
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
   unirseRankings(code:any, student_id:any) : Observable<any>{

    this.sendRequestUrl = "http://localhost:8000/api/sendRequest"
    let request = {code, student_id};
     return this.http.post<any>(this.sendRequestUrl,request).pipe(
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

   eliminarAlumno(ranking_id:any, student_id:any) : Observable<any>{

    this.deleteStudentRank = "http://localhost:8000/api/deleteRanking_user"
    let request = {ranking_id, student_id};
     return this.http.post<any>(this.deleteStudentRank,request).pipe(
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

   createAlumno(ranking_id:any, student_id:any) : Observable<any>{

    this.añadirUsuarioRanking = "http://localhost:8000/api/createRanking_user"
    let request = {ranking_id, student_id};
     return this.http.post<any>(this.añadirUsuarioRanking,request).pipe(
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

   sumarAlumno(ranking_id:any, student_id:any, puntuation:any) : Observable<any>{

    this.deleteStudentRank = "http://localhost:8000/api/updateRanking_user"
    let request = {ranking_id, student_id, puntuation};
     return this.http.post<any>(this.deleteStudentRank,request).pipe(
       filter((value: any) => {
         let found = false;
         if(value != null){
           found = true
          this.sumarTotalAlumno(student_id).subscribe({next: (value: any) => {  }});

         }else{
           found = false
         }
         return found
         })
     );
   }

   sumarTotalAlumno(id:any) : Observable<any>{

    this.updateTotalRanking = "http://localhost:8000/api/puntuation"
    let request = {id};
     return this.http.post<any>(this.updateTotalRanking,request).pipe(
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

   eliminarRanking(id:any) : Observable<any>{

    this.deleteRanking = "http://localhost:8000/api/deleteRanking"
    let request = {id};
     return this.http.post<any>(this.deleteRanking,request).pipe(
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

   crearRanking(name:any, professor_id:string) : Observable<any>{

    this.createRanking = "http://localhost:8000/api/createRanking"

    let request = {professor_id, name};

     return this.http.post<any>(this.createRanking, request).pipe(
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

   actualizarRanking(name:any, rank_id:number) : Observable<any>{

    this.updateRanking = "http://localhost:8000/api/updateRanking"

    let request = {rank_id, name};

     return this.http.post<any>(this.updateRanking, request).pipe(
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

   cambiarCodigo(ranking_id:any) : Observable<any>{

    this.changeCode = "http://localhost:8000/api/newCode/"+ranking_id

    return this.http.get<any>(this.changeCode).pipe(
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
