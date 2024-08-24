import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private _HttpClient: HttpClient) {
   
  }


  TASKS():Observable<any>{
    return this._HttpClient.get('Task/count')
  }
  projectNumber(data:any):Observable<any>{
    return this._HttpClient.get('Project/manager',data)
  }
  progress(data:any):Observable<any>{
    return this._HttpClient.get('Project',data)
  }
  deleteproject(id:number):Observable<any>{
    return this._HttpClient.delete(`Project/${id}`)
  }
  
}
