import { Component } from '@angular/core';
import { ProjectService } from '../../../project/services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.scss']
})
export class AddEditViewComponent {
  title: string = '';
  id: number = 0;
  projectId: number = 0;
  projectTitle: string = '';
  employeeId: number = 0;
  // action: string = '';

  allEmployees:any;
  allProjects:any;
  
  formData = { title: '', description: '', employeeId: 0, projectId: 0 };

  addNewForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    employeeId: new FormControl(0, [Validators.required]),
    projectId: new FormControl(0, [Validators.required]),
  });

  onSubmitForm(data: FormGroup) {
    if (this.id > 0 && this.title === 'Edit Task') {
      this._ProjectService.updateProject(this.id, data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this._Toaster.error(err.error.message, 'Error!')
        },
        complete: () => {
          console.log('Completed Req!');
          this._Toaster.success('Task Updated Successfully', 'Success!')
        }
      })
      // this.onAddNewProject(data.value);
    }
    else {
      this._ProjectService.addNewProject(data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this._Toaster.error(err.error.message, 'Error!')
        },
        complete: () => {
          console.log('Completed Req!');
          this._Toaster.success('Successfully Added Task', 'Success!')
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
        this.projectId = res.project.id;
        this.projectTitle = res.project.title;
        this.formData = res
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
          employeeId: this.formData?.employeeId,
          projectId:  this.formData?.projectId,
        })
      },
    })
  }

  onGetAllEmployees() {
    this._TaskService.getAllUsers({
      pageSize: 10000,
      pageNumber: 1
    }).subscribe({
      next: (res) => { 
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

  onGetAllProjects(){
    this._ProjectService.getProjects({
      pageSize : 10000,
      pageNumber : 1
    }).subscribe({
      next: (res) => {
        this.allProjects = res.data;
        // this.projectId = this.allProjects?.id;
      },
      error: (err) => { 
        console.log(err.error.message);
      },
      complete: () => { 
        console.log('Completed All Projects Request');
      },
    })
  }
  
  constructor(
    private _ProjectService: ProjectService,
    private _Toaster: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _TaskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.onGetAllEmployees();
    this.allEmployees;
    this.onGetAllProjects();
    this.allProjects;
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
    }
  }
}
