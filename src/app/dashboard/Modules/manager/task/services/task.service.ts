import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _HttpClient: HttpClient) { }

  getTaskById(id: number): Observable<any> {
    return this._HttpClient.get(`Task/${id}`);
  }

  getAllUsers(parms: any): Observable<any>{
    return this._HttpClient.get(`Users`, {params: parms})
  }

  getAllProjectsManager(parms: any): Observable<any>{
    return this._HttpClient.get(`Project`, {params: parms})
  }


  addNewTask(data:FormGroup): Observable<any>{
    return this._HttpClient.post(`Task`, data);
  }

  updateTask(id: number, data:FormGroup):Observable<any>{
    return this._HttpClient.put(`Task/${id}`, data);
  }

}
