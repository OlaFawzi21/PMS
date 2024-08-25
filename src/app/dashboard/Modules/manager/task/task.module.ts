import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { AddEditViewComponent } from './components/add-edit-view/add-edit-view.component';


@NgModule({
  declarations: [
    TaskComponent,
    AddEditViewComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
