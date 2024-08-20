import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from './../interfaces/register';
import { Verify } from '../interfaces/verify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  onRegister(data: FormData): Observable<Register> {
    return this.http.post<Register>('Users/Register', data);
  }

  onVerify(data: Verify): Observable<Verify> {
    return this.http.put<Verify>('Users/verify', data);
  }
}
