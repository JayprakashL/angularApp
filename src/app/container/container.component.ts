import { AfterContentInit, Component, ContentChild, Host } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomService } from '../room/services/room.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  //providers: [RoomService]
})
export class ContainerComponent implements AfterContentInit{
  // The container component does not know what components are available to be used which has been sent by the parent component.
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor(@Host() private roomService: RoomService) {}
  // Now as the container component is the host, all the component defined inside container component will be checked.
  // Container component contains employee and room component.
  // So if service is checked in employee and was not found, it will check in the container module and if service is not present, it will throw an error.
  // This is because Container component is a host(standalone) component in which a separate instance of rooms is used and no component loaded inside the Container component will go above the container component level to look for the service instance.
  // Host is like a separate nesting of component-tree structure to be defined, as a component can be marked host in which it becomes a standalone component or a mini hierarchy with some injected services and rendering some other classes.
  
  ngAfterContentInit(): void {
      this.employee.empName = 'Container Employee';
  }
}
