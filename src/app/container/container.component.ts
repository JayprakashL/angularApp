import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements AfterContentInit{
  // The container component does not know what components are available to be used which has been sent by the parent component.
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  
  ngAfterContentInit(): void {
      this.employee.empName = 'Container Employee';
  }
}
