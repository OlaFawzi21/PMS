import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DashService } from 'src/app/dashboard/service/dash.service';
import { Router } from '@angular/router';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  headArray = [
    { headName: 'Username', keyName: 'userName' },
    { headName: 'Email', keyName: 'email' },
    { headName: 'Image', keyName: 'imagePath' },
    { headName: 'Country', keyName: 'country' },
    { headName: 'phoneNumber', keyName: 'phoneNumber' },
    { headName: 'Creation Date', keyName: 'creationDate' },
    { headName: 'Modification Date', keyName: 'modificationDate' },
    {
      headName: 'Actions',
      keyName: 'actions',
      actionsData: [
        { key: 'view', icon: 'visibility' },
        { key: 'block', icon: 'block' },
      ],
    },
  ];
  usersList: User;
  searchKey: string = '';
  searchTag : string = ''
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(
    private _TaskService: UserService,
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
      status: [this.searchTag],
    };
    this._TaskService.getUsers(params).subscribe({
      next: (res) => {
        this.usersList = res;
        console.log(this.usersList);
      },
    });
  }

  reset() {
    this.searchKey = '';
    this.getTasks();
  }

  onActionClick(action: string, user: any) {
    switch (action) {
      case 'edit':
        this.editProject(user);
        break;
      case 'delete':
        this.deleteProject(user);
        break;
      case 'view':
        this.viewProject(user);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  editProject(user: any) {
    console.log('Editing project:', user);
    this._Router.navigate(['/dashboard/manager/tasks/edit', user.id]);
  }

  deleteProject(task: any) {
    console.log('Deleting project:', task);
    this.openDeleteDialog(task.id);
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

  viewProject(project: any) {
    console.log('Viewing project:', project);
    this._Router.navigate(['/dashboard/manager/tasks/view', project.id]);
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
