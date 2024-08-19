import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    SharedComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
