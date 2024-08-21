import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ResetPass } from '../../interfaces/resetPass';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  erroMsg:string=''
  erroMsg2:string=''
  erroMsg3:string=''
  erroMsg4:string=''
  constructor(private _AuthService:AuthService , private _router:Router,private _ToastrService:ToastrService){}
  resetform:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    seed:new FormControl('',[Validators.required]),
  })
  onReset():void{
    this._AuthService.resetPass(this.resetform.value as ResetPass).subscribe({
next:(res)=>{
  console.log(res)
},
error:(err)=>{
  console.log(err)
      this.erroMsg=err.error.additionalInfo.errors.seed;
      this.erroMsg2=err.error.additionalInfo.errors.confirmPassword
      this.erroMsg3=err.error.additionalInfo.errors.password
      this.erroMsg4=err.error.additionalInfo.errors.email
      console.timeLog(this.erroMsg)
      this._ToastrService.warning(this.erroMsg)
      this._ToastrService.warning(this.erroMsg2)
      this._ToastrService.warning(this.erroMsg3)
      this._ToastrService.warning(this.erroMsg4)
     },
     
    })
  }
}
