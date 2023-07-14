import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/class/employee';
import { EmployeeService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employees:Employee[]=[];
  emp !:Employee;
  newEmployee:Employee={
    id:0,
    first_name:'',
    last_name:'',
    email:''
  }
  viewEmployees:boolean=true;
  newForm:boolean= false;
  updateForm:boolean =false;

  constructor(private employeeService:EmployeeService, private router:Router){}
  ngOnInit(){
    
    this.employeeService.getEmployees().subscribe(
      (response:any) => this.employees =response,
      (error) => console.log(error),
      () => console.log(this.employees)
    );
  }

  allDetails(id:number){
    this.viewEmployees = !this.viewEmployees;
    this.employeeService.getEmployeeById(id).subscribe(
      Response => this.emp=Response,
      error => console.log(error),
      () =>console.log(this.emp)
    )
  }

  employeeList(){
    this.viewEmployees = !this.viewEmployees;
  }
  listEmp(){
    this.newForm = !this.newForm;
    
  }

  

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id);
    this.employeeService.getEmployees().subscribe(
      (response:any) => this.employees =response,
      (error) => console.log(error),
      () => console.log(this.employees)
    );
    this.viewEmployees = !this.viewEmployees;
  }

  Employee(p:boolean){
    if(p){
    console.log(this.newEmployee);
    this.employeeService.addEmployee(this.newEmployee);
    this.newForm = !this.newForm;
  }
  else{
    this.employeeService.update(this.emp);
    this.updateForm =!this.updateForm
  }
  this.employeeService.getEmployees().subscribe(
    (response:any) => this.employees =response,
    (error) => console.log(error),
    () => console.log(this.employees)
  );
  }

  updateEmp(){
    this.updateForm = !this.updateForm;
  }
}
