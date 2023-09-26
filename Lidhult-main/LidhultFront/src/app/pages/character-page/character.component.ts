import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from './../../services/character.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  constructor(
    private characterService:CharacterService,
    public authService: AuthService,
    private router: Router
    ) { }

  images:any = [];
  imgLv1:any = [];
  img_id:any;
  clasesBotonStud:Array<string> = ['eze','vargas','lance','selena','atro','magress']
  clasesBotonProf:Array<string> = ['baldran','eldora','eriole','ezra','ginryou','lukroar']
  cambiar:number = 0;
  selected = 'Eze';

  ngOnInit(): void {

    if(this.authService.user == undefined || this.authService.user == null){ this.router.navigate(['register'])}

    if(this.authService.stud){ this.img_id = 1 }
    else { this.img_id = 43 }

    this.recogerImg();
  }
  img0 = true;
  img1 = false;
  img2 = false;
  img3 = false;
  img4 = false;
  img5 = false;
  faseImagenes: boolean[] = [this.img0 ,this.img1, this.img2, this.img3, this.img4, this.img5]

  recogerImg(){

    if(this.authService.stud){

      this.characterService.imagenesCharacter().subscribe({ 
        next: (value: any) => {        
          this.images = value.data;
          this.ordenarImg(this.images);
        }
      });

    }else{

      this.characterService.imagenesBosses().subscribe({ 
        next: (value: any) => {        
          this.images = value.data;
          this.ordenarImg(this.images);
        }
      });

    }

   
  }

  ordenarImg(images:any){

    for (let i = 0; i < images.length; i++) {
      if (images[i].level == 1) { this.imgLv1.push(images[i]) }
    }

  }

  cambiarImg(id:number){

    for (let i = 0; i <  this.imgLv1.length; i++) {

      if(id == i){
        
        this.faseImagenes[i] = true; this.selected = this.imgLv1[i].name
        this.cambiar = i
        this.img_id = this.imgLv1[i].id;


      } 
      else { this.faseImagenes[i] = false }
      
    }
  }

  register(){

    this.authService.user['character_id'] = this.img_id

    if(this.authService.prof == false) {

      this.authService.registerStudent(this.authService.user).subscribe({
          
        next: (value: any) => {

          this.authService.user = value;

          if(value['status'] == 1){

            let dato = value.nick
            let password = value.pass
            let request = {dato, password}
            
            this.authService.login(request).subscribe({
          
              next: (value: any) => {
                this.authService.user = value;
      
                if(value['status'] == 1){

                  const token = value.access_token;
                  
                  localStorage.setItem('access_token', token);
                  localStorage.setItem('status', '1');
                  localStorage.setItem('value', JSON.stringify(value));
                  this.router.navigate(['ranking'])
      
                } else { this.router.navigate(['login']) }
                }
              });

          }
          }
        });

    } else {


      this.authService.registerProfessor(this.authService.user).subscribe({
        
        next: (value: any) => {
          this.authService.user = value;
          if(value['status'] == 1){

            let dato = value.nick
            let password = value.pass
            let request = {dato:dato, password:password}
            
            this.authService.login(request).subscribe({
          
              next: (value: any) => {
                
                this.authService.user = value;
      
                
                if(value['status'] == 1){

                  const token = value.access_token;

                  localStorage.setItem('access_token', token);
                  localStorage.setItem('status', '1');
                  localStorage.setItem('value', JSON.stringify(value));

                  this.router.navigate(['menuProfessor'])
      
                } else { this.router.navigate(['login']) }

                } 
                
              });

          }
        }
      });

    }

  }

}
