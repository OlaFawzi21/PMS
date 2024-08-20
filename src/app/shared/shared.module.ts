import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    SharedComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ], 
  exports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
