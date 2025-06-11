import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  addEmp:any={
    "Name":"",
    "username":"",
    "Designation":"",
    "Department":"",
    "email":"",
    "PhoneNo":""
  };
  list:any[]=[];

  http=inject(HttpClient);
  constructor(
    private router:Router
  ){}


  onEdit(data: any){
    this.addEmp = data;
  }
  
  resetForm() {
     
    this.addEmp = {  
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
    this.http.post("http://localhost:3000/employees/addEmployee",this.addEmp).subscribe((res:any)=>{
    debugger;
    if(res.employee){
      alert("Employee Added Successfully");
      this.router.navigate(['/emp-list']); 

    }else{
      alert("Employee didnt get added")
    }
  })
}
}


