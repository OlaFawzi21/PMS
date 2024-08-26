import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _HttpClient: HttpClient) {}

  getTasks(myParams: Params): Observable<Task> {
    return this._HttpClient.get<Task>('Task/manager', {
      params: myParams,
    });
  }
}
