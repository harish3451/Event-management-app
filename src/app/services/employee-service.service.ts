import { Injectable } from '@angular/core';
import { Employee } from '../class/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employee:Employee[]=[];

  empUrl:string ="http://localhost:3000/employees";

  constructor(private http:HttpClient, private router:Router) { }

  getEmployees():Observable<Employee>{
    return this.http.get<Employee>(this.empUrl);
  }

  getEmployeeById(id:number): Observable<Employee>{
    return this.http.get<Employee>(this.empUrl+`/${id}`);
  }

  deleteEmployee(id:number){
    this.http.delete(this.empUrl+`/${id}`).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    this.router.navigate(['employees'])
  }
  addEmployee(emp:Employee){
    this.http.post(this.empUrl,emp).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  update(emp:Employee){
    this.http.put(this.empUrl+`/${emp.id}`,emp).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
