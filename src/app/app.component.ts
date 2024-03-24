import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Employee} from "./employee/employee";
import {EmployeeService} from "./employee/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;
  title: string = "test";

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        console.log(response);
        this.employees = response;
      },
      error : (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

}
