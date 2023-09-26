import { LoginData } from './../model/login-data';
import { RegisterComponent } from './../pages/register-page/register.component';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(  
    private authService: AuthService,
    private router: Router
  ){}

  user:any

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      let user
      

      if(localStorage.getItem('access_token') != null){

        setTimeout(() => {
          localStorage.removeItem('value');
          localStorage.removeItem('status');
          localStorage.removeItem('access_token');
          this.authService.status = 0;
          localStorage.clear(); 
          window.location.reload()
        }, 7200000);
       
        if(!this.authService.prof){


          this.user = localStorage.getItem('value');
          this.authService.user = JSON.parse(this.user);
          this.authService.status = localStorage.getItem('status'); 
          if(this.authService.user.data[0].center != undefined){ this.authService.prof = true } else  { this.authService.stud = true }

            let nick = this.authService.user.data[0].nick
            
            return true     

        }

        

      } else {

        localStorage.removeItem('value');
        localStorage.removeItem('status');
        localStorage.removeItem('access_token');
        this.authService.status = 0;
        localStorage.clear();
        
        this.router.navigate(['login']);
        return false

      }

    return true;
  }
  
}
