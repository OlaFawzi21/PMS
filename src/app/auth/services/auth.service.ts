import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userRole: string | null = '';

  getProfile() {
    const encodedToken: any = localStorage.getItem('userToken');
    const decoded: any = jwtDecode(encodedToken);
    localStorage.setItem('userName', decoded.userName);
    localStorage.setItem('userEmail', decoded.userEmail);
    localStorage.setItem('role', decoded.userGroup);
    this.getRole();
  }

  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null) {
      this.userRole = localStorage.getItem('role');
    }
    return this.userRole;
  }

  constructor(private _HttpClient: HttpClient) { 
    this.getRole();
  }

  login(data: Login): Observable<any> {
    return this._HttpClient.post('https://upskilling-egypt.com:3003/api/v1/Users/Login', data);
  }


}
