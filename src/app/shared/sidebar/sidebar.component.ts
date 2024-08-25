import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenu {
  title: string;
  icon: string;
  link?: string;
  isActive: boolean;
  action?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggler: boolean = false;

  sendData() {
    this.toggler = !this.toggler;
    this.toggle.emit(this.toggler);
  }

  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'house',
      link: '/dashboard/home',
      isActive: true,
    },
    {
      title: 'Users',
      icon: 'group',
      link: '1',
      isActive: this.isManager(),
    },
    {
      title: 'Projects',
      icon: 'grid_view',
      link: '/dashboard/manager/projects',
      isActive: this.isManager(),
    },
    {
      title: 'Tasks',
      icon: 'format_list_bulleted',
      link: '1',
      isActive: this.isManager(),
    },
    {
      title: 'Projects',
      icon: 'grid_view',
      link: '1',
      isActive: this.isEmployee(),
    },
    {
      title: 'Tasks',
      icon: 'format_list_bulleted',
      link: '1',
      isActive: this.isEmployee(),
    },
  ];

  constructor(
    private _AuthService: AuthService,
  ) {}
  ngOnInit() {}

  isManager() {
    return this._AuthService.userRole == 'Manager' ? true : false;
  }

  isEmployee() {    
    return this._AuthService.userRole == 'Employee' ? true : false;
  }
}
