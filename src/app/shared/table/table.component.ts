import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Project,
  ProjectData,
} from 'src/app/dashboard/Modules/manager/project/interfaces/project';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() headList: any[];
  @Input() gridList: Project;
  @Output() actionClick = new EventEmitter<{
    action: string;
    project: ProjectData;
  }>();

  gridData: ProjectData[] | any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridList'] && changes['gridList'].currentValue) {
      this.gridData = this.gridList.data;
      console.log(this.gridData);
    }
  }

  handleAction(action: string, project: ProjectData) {
    this.actionClick.emit({ action, project });
  }
}
