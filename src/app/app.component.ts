import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Employee} from "./employee/employee";
import {EmployeeService} from "./employee/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CommonModule, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule],
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

  public onOpenModal(employee: Employee | null, mode: string): void {
    console.log("OPENED MODAL")
    console.log(employee);
    const mainContainer = document.getElementById("main-container")!
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      console.log("add")
      button.setAttribute("data-target", "#addEmployeeModal");
    }
    if (mode === "edit") {
      console.log("edit")
      button.setAttribute("data-target", "#updateEmployeeModal");
    }
    if (mode === "delete") {
      console.log("delete")
      button.setAttribute("data-target", "#deleteEmployeeModal");
    }
    mainContainer.appendChild(button);
    button.click();
  }

}
