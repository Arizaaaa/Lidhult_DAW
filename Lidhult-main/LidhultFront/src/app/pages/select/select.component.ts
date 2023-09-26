import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {

   
  }

  prof(){
    this.authService.elegirProf();
    this.router.navigate(['register']); 
  }
  stud(){
    this.authService.elegirStud();
    this.router.navigate(['register']); 
  }
}
