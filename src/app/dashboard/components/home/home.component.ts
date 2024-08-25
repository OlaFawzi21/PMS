import { DashService } from './../../service/dash.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  taskCount: any;
  pagesize: 1000;
  pagenumber = 1;
  projects: any;
  counter: number = 0;
  progress: any;
  Username = localStorage.getItem('userName');
  role: string | null;
  constructor(
    private _DashService: DashService,
    private _AuthService: AuthService
  ) {}
  ngOnInit(): void {
    this.role = this._AuthService.userRole;
    if (this.role !== 'Employee') {
      this.getTasks();
      this.getProjects();
      this.getProgress();
    }
  }
  getTasks() {
    this._DashService.TASKS().subscribe({
      next: (res) => {
        console.log(res);
        this.taskCount = res;
      },
    });
  }
  getProjects() {
    let data = {
      pageSize: this.pagesize,
      pageNumber: this.pagenumber,
    };
    this._DashService.projectNumber(data).subscribe({
      next: (res) => {
        console.log(res);
        this.projects = res;
      },
    });
  }
  getProgress() {
    let data = {
      pageSize: this.pagesize,
      pageNumber: this.pagenumber,
    };
    this._DashService.progress(data).subscribe({
      next: (res) => {
        console.log(res);
        this.progress = res;
        if (this.progress.data.isActivated == true) {
          this.counter = this.counter + 1;
        }
      },
    });
  }
}
