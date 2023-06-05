import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,private _service : EmployeeService,
    private _coreService : CoreService){}

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next : (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList(){
    this._service.getEmployeeList().subscribe({
      next : (resp)=>{
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error : (err)=>{
        console.error(err);

      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id : number){
    this._service.deleteEmployee(id).subscribe({
      next : ()=>{
        this._coreService.openSnackBar("Employee deleted",'done')
        this.getEmployeeList();
      },
      error : (err)=>{
        console.error(err);

      }
    })
  }

  openEditForm(data:any){
    const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data
    });
    dialogRef.afterClosed().subscribe({
      next : (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

}
