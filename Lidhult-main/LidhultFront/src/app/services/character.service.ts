import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(public http: HttpClient) { }

  readonly getCharacterUrl = "http://localhost:8000/api/indexCharacters"
  readonly getBossesUrl = "http://localhost:8000/api/indexBosses"
  readonly perfilCharcherUrl = "http://localhost:8000/api/readCharacter/"
  data:any;

  imagenesCharacter() : Observable<any>{

    return this.http.get<any>(this.getCharacterUrl).pipe(
      filter((value: any) => {
        let found = false;
        if(value != null){
          found = true
        }else{
          found = false
        }
        this.data = value;
        return found
        })
    );
  }

  imagenesBosses() : Observable<any>{

    return this.http.get<any>(this.getBossesUrl).pipe(
      filter((value: any) => {
        let found = false;
        if(value != null){
          found = true
        }else{
          found = false
        }
        this.data = value;
        return found
        })
    );
  }

  characterPefil(id:number) : Observable<any>{

    return this.http.get<any>(this.perfilCharcherUrl+id).pipe(
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
