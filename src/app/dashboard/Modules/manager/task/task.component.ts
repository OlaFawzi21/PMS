import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Task, TaskData } from './interfaces/task';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DashService } from 'src/app/dashboard/service/dash.service';
import { Router } from '@angular/router';
import { TaskService } from './services/task.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  headArray = [
    { headName: 'Title', keyName: 'title' },
    { headName: 'Status', keyName: 'status' },
    { headName: 'Description', keyName: 'description' },
    { headName: 'Project', keyName: 'project.title' },
    { headName: 'Manger', keyName: 'project.manager.userName' },
    { headName: 'Employee', keyName: 'employee.userName' },
    { headName: 'Creation Date', keyName: 'creationDate' },
    { headName: 'Modification Date', keyName: 'modificationDate' },
    {
      headName: 'Actions',
      keyName: 'actions',
      actionsData: [
        { key: 'view', icon: 'visibility' },
        { key: 'edit', icon: 'edit_square' },
        { key: 'delete', icon: 'delete' },
      ],
    },
  ];
  tasksList: Task;
  searchKey: string = '';

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(
    private _TaskService: TaskService,
    private _Router: Router,
    public dialog: MatDialog,
    private _DashService: DashService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      title: this.searchKey,
    };
    this._TaskService.getTasks(params).subscribe({
      next: (res) => {
        this.tasksList = res;
        console.log(this.tasksList);
      },
    });
  }

  reset() {
    this.searchKey = '';
    this.getTasks();
  }

  onActionClick(action: string, task: TaskData) {
    switch (action) {
      case 'edit':
        this.editProject(task);
        break;
      case 'delete':
        this.deleteProject(task);
        break;
      case 'view':
        this.viewProject(task);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  editProject(project: TaskData) {
    console.log('Editing project:', project);
    this._Router.navigate(['/dashboard/manager/projects/edit', project.id]);
  }

  deleteProject(project: TaskData) {
    console.log('Deleting project:', project);
    this.openDeleteDialog(project.id);
  }

  openDeleteDialog(myid: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { text: 'project', id: myid },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('my' + result);
      if (result) {
        this.onDelete(result);
      }
    });
  }

  onDelete(id: number) {
    this._DashService.deleteproject(id).subscribe({
      next: (res) => {
        this._ToastrService.success(
          ' project deleted successfully',
          'Success!'
        );
      },
      complete: () => {
        this.getTasks();
      },
    });
  }

  viewProject(project: TaskData) {
    console.log('Viewing project:', project);
    this._Router.navigate(['/dashboard/manager/projects/view', project.id]);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getTasks();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

}
