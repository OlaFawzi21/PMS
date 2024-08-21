import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPass } from '../interfaces/resetPass';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private _HttpClient:HttpClient) { }
forgetpass(data:any):Observable<any>{
  return this._HttpClient.post('Users/Reset/Request',data)
}
resetPass(data:ResetPass):Observable<any>{
  return this._HttpClient.post('Users/Reset',data)
}

}
