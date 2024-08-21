import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { AddEditViewComponent } from './components/add-edit-view/add-edit-view.component';


@NgModule({
  declarations: [
    ProjectComponent,
    AddEditViewComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
