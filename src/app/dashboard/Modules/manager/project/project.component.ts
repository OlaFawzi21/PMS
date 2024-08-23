import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';
import { Project, ProjectData } from './interfaces/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  headArray = [
    { headName: 'Title', keyName: 'title' },
    { headName: 'Description', keyName: 'description' },
    { headName: 'Creation date', keyName: 'creationDate' },
    { headName: 'Modification date', keyName: 'modificationDate' },
    { headName: 'Actions', keyName: 'actions' , actionsData: ['view' , 'edit' , 'delete']},
  ];
  projectList: Project;

  constructor(private _ProjectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    let params = {
      pageSize: 10,
      pageNumber: 1,
    };
    this._ProjectService.getProjects(params).subscribe({
      next: (res) => {
        this.projectList = res;
        console.log(this.projectList);
      },
    });
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
}
