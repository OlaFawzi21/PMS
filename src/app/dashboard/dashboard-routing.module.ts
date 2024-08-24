import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { managerGuard } from '../Core/Guards/manager.guard';
import { employeeGuard } from '../Core/Guards/employee.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path:'home',component:HomeComponent},
      { path: 'manager', canActivate: [managerGuard], loadChildren: () => import('./Modules/manager/manager.module').then(m => m.ManagerModule) },
      { path: 'employee', canActivate: [employeeGuard], loadChildren: () => import('./Modules/employee/employee.module').then(m => m.EmployeeModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
