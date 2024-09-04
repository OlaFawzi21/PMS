import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { EmployeeTaskService } from './Services/employee-task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  todo: any = [];
  done: any = [];
  inProgress: any = [];

  drop(event: CdkDragDrop<string[]>) {

    console.log('Dragged item data:', event.item.data);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const taskId = event.item.data.id;
      // const newStatus = 
      //   event.container.id === 'todoList' ? 'ToDo' :
      //   event.container.id === 'inProgressList' ? 'InProgress' :
      //   event.container.id === 'doneList' ? 'Done' : '';
      console.log(event.currentIndex);
      console.log(event.container.data);
      console.log(event.container);
      // this.onUpdateTaskStatus(taskId, newStatus);
    }
  }


  onGetMyTasks() {
    this._EmployeeTaskService.getMyTasks().subscribe({
      next: (res) => {
        const allMyTasks = res.data;
        console.log(allMyTasks);
        this.todo = allMyTasks.filter((allMyTasks: any) => allMyTasks.status === 'ToDo');
        this.inProgress = allMyTasks.filter((allMyTasks: any) => allMyTasks.status === 'InProgress');
        this.done = allMyTasks.filter((allMyTasks: any) => allMyTasks.status === 'Done');
      }
    })
  }

  onUpdateTaskStatus(id: number, newStatus: string) {
    const statusData = { status: newStatus };
    this._EmployeeTaskService.updateTaskStatus(id, statusData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  constructor(private _EmployeeTaskService: EmployeeTaskService) { }
  ngOnInit(): void {
    this.onGetMyTasks();
  }
}
