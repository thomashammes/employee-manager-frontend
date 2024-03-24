import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Employee} from "./employee/employee";
import {EmployeeService} from "./employee/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined | null;
  public deleteEmployee: Employee | undefined | null;

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

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById("add-employee-form")!.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
        addForm.reset();
      }
    });
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

  public onDeleteEmployee(employeeId: number | undefined): void {
    console.log("onDeleteEmployee")
    console.log(employeeId)
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees!) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
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
      this.editEmployee = employee;
      button.setAttribute("data-target", "#updateEmployeeModal");
    }
    if (mode === "delete") {
      console.log("delete")
      this.deleteEmployee = employee;
      button.setAttribute("data-target", "#deleteEmployeeModal");
    }
    mainContainer.appendChild(button);
    button.click();
  }

}
