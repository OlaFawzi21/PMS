import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _HttpClient: HttpClient) {}

  getProjects(myParams: Params): Observable<Project> {
    return this._HttpClient.get<Project>('Project/manager', {
      params: myParams,
    });
  }
}
