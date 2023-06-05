
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{
  eduction:string[] = [
    'High School',
    'Graduate',
    'Post Graduate',
    'University',
    'Diploma',
  ]

  empForm : FormGroup

  constructor(_builder : FormBuilder,private _empService : EmployeeService,
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,@Inject(MAT_DIALOG_DATA)public data :any,
    private _coreService : CoreService){
    this.empForm = _builder.group({
      firstName : '',
      lastName : '',
      email : '',
      dob : '',
      gender : '',
      education : '',
      company : '',
      experience : '',
      package : '',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(){
    if (this.empForm.valid){
      if (this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next : (val:any)=>{
            this._coreService.openSnackBar("Employee Updated Successfully",'done')
            this._dialogRef.close(true)
          },
          error : (err:any)=>{
            console.error(err);

          }
        })
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
        next : (val:any)=>{
          this._coreService.openSnackBar("Employee Added Successfully",'done')
          this._dialogRef.close(true);
        },
        error : (err:any)=>{
          console.error(err);

        }
      })
      }

    }
  }

}
