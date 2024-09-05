import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  hide: boolean = true;
  isHideConfirm: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<ChangepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  changeform:FormGroup=new FormGroup({
    oldPassword:new FormControl('',[Validators.required]),
      newPassword:new FormControl('',[Validators.required]),
      confirmNewPassword:new FormControl('',[Validators.required]),
    })
}
