import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "./employee";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private apiServerUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(id: number | undefined): Observable<void> {
    console.log()
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
  }

}
