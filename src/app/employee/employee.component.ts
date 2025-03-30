import { Component, Self } from '@angular/core';
import { RoomService } from '../room/services/room.service';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  // providers: [RoomService]
})
export class EmployeeComponent {

  empName: string = 'New Employee';

  // @Self()
  constructor (@Self() private roomService: RoomService){

  }
}
