import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(public http: HttpClient) { }

  request:any;
  readonly deleteTask = "http://localhost:8000/api/deleteTask"
  readonly saveTask = "http://localhost:8000/api/createTask"
  readonly modificarTask = "http://localhost:8000/api/updateTask"
  readonly recogerTask = "http://localhost:8000/api/indexTask"
  readonly entregarTask = "http://localhost:8000/api/createTaskFile"
  readonly recogerTaskFile = "http://localhost:8000/api/indexFile"
  readonly modificarTaskFile = "http://localhost:8000/api/updateFile"
  readonly recogerTareasEntregadasRanking = "http://localhost:8000/api/indexTareasRanking"
  readonly updatePuntuation = "http://localhost:8000/api/updatePuntuation"

  recogerTarea(id:number) : Observable<any>{
    this.request = {id}
    return this.http.post<any>(this.recogerTask, this.request).pipe(
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

  eliminarTarea(id:any) : Observable<any>{
    this.request = {id}
    
     return this.http.post<any>(this.deleteTask, this.request).pipe(
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

   saveTarea(task:any) : Observable<any>{
    
    return this.http.post<any>(this.saveTask, task).pipe(
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

  modificarTarea(task:any){

    return this.http.post<any>(this.modificarTask, task).pipe(
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

  entregarTarea(task:any){

    return this.http.post<any>(this.entregarTask, task).pipe(
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

  recogerArchivos(task:any){

    return this.http.post<any>(this.recogerTaskFile, task).pipe(
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

  modificarArchivos(task:any){

    return this.http.post<any>(this.modificarTaskFile, task).pipe(
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

  recogerTareas(id:any){

    return this.http.post<any>(this.recogerTareasEntregadasRanking, id).pipe(
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

  puntuar(puntuation:any, task_id:any, stud_id:any){

    let request = {puntuation, task_id, stud_id}


    return this.http.post<any>(this.updatePuntuation, request).pipe(
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
