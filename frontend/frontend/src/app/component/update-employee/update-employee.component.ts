import { JsonPipe,NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,JsonPipe,NgFor],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
 employeeForm:FormGroup;
  
 its:any={
    "EmployeeID":"",
    "Name":"",
    "username":"",
    "Designation":"",
    "Department":"",
    "email":"",
    "PhoneNo":""
  };
  list:any[]=[];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      EmployeeID: [''],
      Name: ['', Validators.required],
      username: [''],
      Designation: [''],
      Department: [''],
      email: ['', Validators.email],
      PhoneNo: ['']
    });
  }

  ngOnInit(): void {
    this.onClick();
  }


  onEdit(data: any){
    this.its = data;
  }
 

  onDelete(data: any) {
    
    if (confirm("Are you sure you want to delete this employee?")) {
      this.http.delete(`http://localhost:3000/employees/deleteEmployee/${data._id}`).subscribe({
        next: (res: any) => {
          
          if (res && res.employee) {
           
            alert(" Error: Failed to Delete Employee");
            this.onClick();
          } else {
            alert("Employee Deleted Successfully");
          }
        }
      });
    } else {
      alert("Deletion Canceled");
    }
  }
  
resetForm() {
  this.employeeForm.reset(); 
  this.its = {  
    _id:'',
    EmployeeID: '',
    Name: '',
    username: '',
    Designation: '',
    Department: '',
    email: '',
    PhoneNo: ''
  };
}
onSave(){
    debugger;
    this.http.post("http://localhost:3000/employees/addEmployee",this.its).subscribe((res:any)=>{
    debugger;
    if(res.employee){
      alert("Employee Added Successfully");
      this.onClick();

    }else{
      alert("Error:Failed to add employee")
    }
  })
}


onClick(){

  this.http.get("http://localhost:3000/employees").subscribe((result:any)=>{
    this.list=result;

  })
}
}




