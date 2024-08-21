import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from './../interfaces/register';
import { Verify } from '../interfaces/verify';
import { jwtDecode } from 'jwt-decode';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userRole: string | null = '';

  constructor(private _HttpClient: HttpClient) {
    this.getRole();
  }

  getProfile() {
    const encodedToken: any = localStorage.getItem('userToken');
    const decoded: any = jwtDecode(encodedToken);
    localStorage.setItem('userName', decoded.userName);
    localStorage.setItem('userEmail', decoded.userEmail);
    localStorage.setItem('role', decoded.userGroup);
    this.getRole();
  }

  getRole() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('role') !== null
    ) {
      this.userRole = localStorage.getItem('role');
    }
    return this.userRole;
  }

  login(data: Login): Observable<any> {
    return this._HttpClient.post('Users/Login', data);
  }

  onRegister(data: FormData): Observable<Register> {
    return this._HttpClient.post<Register>('Users/Register', data);
  }
  onVerify(data: Verify): Observable<Verify> {
    return this._HttpClient.put<Verify>('Users/verify', data);
  }
}
