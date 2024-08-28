import { Component } from '@angular/core';
import { ProjectService } from '../../../project/services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.scss']
})
export class AddEditViewComponent {
  title: string = ''; // title of task
  id: number = 0; // id of task
  projectId: number = 0; // project id of task
  empId: number = 0; // assigned employee id of task

  allEmployees: any;
  allProjects: any;

  formData = { title: '', description: '' };

  addNewForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    employeeId: new FormControl(0, [Validators.required]),
    projectId: new FormControl(0, [Validators.required]),
  });

  onSubmitForm(data: FormGroup) {
    if (this.id > 0 && this.title === 'Edit Task') {
      this._TaskService.updateTask(this.id, data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this._Toaster.error(err.error.message, 'Error!')
        },
        complete: () => {
          console.log('Completed Req!');
          this._Toaster.success( 'Task Updated Successfully', 'Success!' );
          this.router.navigate( ['/dashboard/manager/tasks'] );
        }
      })
    }
    else {
      this._TaskService.addNewTask(data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this._Toaster.error(err.error.message, 'Error!')
        },
        complete: () => {
          console.log('Completed Req!');
          this._Toaster.success( 'Successfully Added Task', 'Success!' );
          this.router.navigate( ['/dashboard/manager/tasks'] );
        },
      })
    }
  }

  getTitleErrorMessage() {
    const titleControl: any = this.addNewForm.get('title');
    return titleControl.hasError('required') ? 'Title is required.' : '';
  }
  getDescriptionErrorMessage() {
    const descriptionControl: any = this.addNewForm.get('description');
    return descriptionControl.hasError('required') ? 'Description is required.' : '';
  }
  onCancel() {
    this.addNewForm.reset();
  }

  onGetTaskById(id: number) {
    this._TaskService.getTaskById(id).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.project.id);
        console.log(res.employee.id);
        this.projectId = res.project.id;
        this.empId = res.employee.id;
        this.formData = res;
      },
      error: (err) => {
        console.log(err);
        this._Toaster.error(err.error.message, 'Error!')
      },
      complete: () => {
        console.log('Completed Req!');
        this.addNewForm.patchValue({
          title: this.formData?.title,
          description: this.formData?.description,
          employeeId: this.empId,
          projectId: this.projectId,
        } )
      },
    })
  }

  // All employees in system
  getAllEmployees() {
    this._TaskService.getAllUsers({
      groups:[2],
      pageSize: 10000,
      pageNumber: 1
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.allEmployees = res.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        console.log('Completed All Users Request');
      },
    })
  }

  // All projects of the manager [Shaimaa]
  getAllProjects() {
    this._TaskService.getAllProjectsManager({
      pageSize: 10000,
      pageNumber: 1
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.allProjects = res.data;
        console.log(this.allProjects);
        // this.projectId = res.data.id;
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        console.log('Completed All Projects Request');
      },
    });
  }

  constructor(
    // private _ProjectService: ProjectService,
    private _Toaster: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _TaskService: TaskService,
    private router : Router
  ) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllProjects();

    if (this._ActivatedRoute.snapshot.url[0].path === 'add-new') {
      this.title = 'Add a New Task';
    }
    else if (this._ActivatedRoute.snapshot.url[0].path === 'edit') {
      this.title = 'Edit Task';
      this.id = +this._ActivatedRoute.snapshot.url[1].path;
      this.onGetTaskById(this.id);
    }
    else {
      this.title = 'View Task';
      this.id = +this._ActivatedRoute.snapshot.url[1].path;
      this.onGetTaskById(this.id);
      this.addNewForm.get('title')?.disable();
      this.addNewForm.get('description')?.disable();
      this.addNewForm.get('employeeId')?.disable();
      this.addNewForm.get('projectId')?.disable();
    }
  }
}
