import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';
import { Project, ProjectData } from './interfaces/project';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  headArray = [
    { headName: 'Title', keyName: 'title' },
    { headName: 'Description', keyName: 'description' },
    { headName: 'Creation Date', keyName: 'creationDate' },
    { headName: 'Modification Date', keyName: 'modificationDate' },
    { headName: 'Num Tasks', keyName: 'task' },
    {
      headName: 'Actions',
      keyName: 'actions',
      actionsData: [
        { key: 'view', icon: 'visibility' },
        { key: 'edit', icon: 'edit_square' },
        { key: 'delete', icon: 'delete' },
      ],
    },
  ];
  projectList: Project;
  searchKey: string = '';

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(private _ProjectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      title: this.searchKey,
    };
    this._ProjectService.getProjects(params).subscribe({
      next: (res) => {
        this.projectList = res;
        console.log( this.projectList );
      },
    });
  }

  reset() {
    this.searchKey = '';
    this.getProjects();
  }

  onActionClick(action: string, project: ProjectData) {
    switch (action) {
      case 'edit':
        this.editProject(project);
        break;
      case 'delete':
        this.deleteProject(project);
        break;
      case 'view':
        this.viewProject(project);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  editProject(project: ProjectData) {
    console.log('Editing project:', project);
    // Implement edit logic
  }

  deleteProject(project: ProjectData) {
    console.log('Deleting project:', project);
    // Implement delete logic
  }

  viewProject(project: ProjectData) {
    console.log('Viewing project:', project);
    // Implement view logic
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getProjects();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
