import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.scss']
})
export class AddEditViewComponent implements OnInit {
  title: string = '';
  id: number = 0;
  action: string = '';
  formData = { title: '', description: '' };

  addNewForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  onSubmitForm(data: FormGroup) {
    if (this.id > 0 && this.title === 'Edit Project') {
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
          this._Toaster.success('Project Updated Successfully', 'Success!')
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
          this._Toaster.success('Successfully Added Project', 'Success!')
        },
      })
    // this.onUpdateProject(data.value)
    }
  }

  // onAddNewProject(data: FormGroup) {
  //   this._ProjectService.addNewProject(data.value).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this._Toaster.error(err.error.message, 'Error!')
  //     },
  //     complete: () => {
  //       console.log('Completed Req!');
  //       this._Toaster.success('Successfully Added Project', 'Success!')
  //     },
  //   })
  // }
  
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
  onGetProjectById(id: number) {
    this._ProjectService.getProjectById(id).subscribe({
      next: (res) => {
        console.log(res);
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
          description: this.formData?.description
        })
        // this._Toaster.success('Successfully Added Project', 'Success!')
      },
    })
  }

  // onUpdateProject(data: FormGroup) {
  //   this._ProjectService.updateProject(this.id, data.value).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this._Toaster.error(err.error.message, 'Error!')
  //     },
  //     complete: () => {
  //       console.log('Completed Req!');
  //       this._Toaster.success('Project Updated Successfully', 'Success!')
  //     }
  //   })
  // }

  constructor(
    private _ProjectService: ProjectService,
    private _Toaster: ToastrService,
    private _ActivatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    if (this._ActivatedRoute.snapshot.url[0].path === 'add-new') {
      this.title = 'Add a New Project';
    }
    else if (this._ActivatedRoute.snapshot.url[0].path === 'edit') {
      this.title = 'Edit Project';
      this.id = +this._ActivatedRoute.snapshot.url[1].path;
      this.onGetProjectById(this.id);
    }
    else {
      this.title = 'View Project';
      this.id = +this._ActivatedRoute.snapshot.url[1].path;
      this.onGetProjectById(this.id);
      this.addNewForm.get('title')?.disable();
      this.addNewForm.get('description')?.disable();
    }
  }
}
