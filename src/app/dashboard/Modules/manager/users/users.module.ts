import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    UsersComponent,
    ChangepasswordComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class UsersModule { }
