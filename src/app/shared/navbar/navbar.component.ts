import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  Username = localStorage.getItem('userName');
  useremail = localStorage.getItem('userEmail');
  
  // userId:number=0;
  
  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    localStorage.clear();
    this._Router.navigate(['/auth/login']);
  }


  constructor(
    private _Router: Router,
    private _AuthService: AuthService
  ) { 
  }

  ngOnInit(): void {
    // this._AuthService.getProfile();
    // this.userId = Number(localStorage.getItem('userId'));
  }

  


}
