import { AfterViewChecked, AfterViewInit, Component, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomsList } from './room';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { RoomService } from './services/room.service';

@Component({
  selector: 'app-room',
  imports: [CommonModule, RoomsListComponent, HeaderComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit, AfterViewInit, AfterViewChecked {
  // availableRooms = 20;
  occupiedRooms = 5;
  bookedRooms = 10;
  flag = true;

  title = "Room Lists";

  selectedRoom!: RoomsList;

  rooms: Room = {
    availableRooms: 5,
    bookedRooms: 10,
    totalRooms: 20
  }

  roomList: RoomsList[] = [];

  // By default, static: false
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent; // can access the HeaderComponent instance inside RoomComponent
  // This instance is visible only in ngAfterViewInit, but if static is true the Component is visible in ngOnInit.
  // This is because HeaderComponent does not contain any asynchronous code and is safe to use.
  // this.headerComponent on static:false is available on ngAfterViewInit is because ngOnInit initialises the component and ngAfterViewInit initialises the view containing in the component. 

  @ViewChildren(HeaderComponent) headerChildren!: QueryList<HeaderComponent>;
  /*
 QueryList<Component> contains: dirty -> boolean flag if any value is changed
                                first, last -> Displays the first and last component present.
                                length -> number of components
                                results -> total components present
  */

  // Keep it private as the service should not be displayed into the template.
  // @SkipSelf() is used to skip the local component for service and check for the parent component.
  // Dependenct Resolution works hierarchically up and will ignore the local injector.
  constructor(@SkipSelf() private roomService: RoomService) { }

  ngOnInit(): void {
    console.log(this.headerComponent);  // returns undefined, but if passed in ngAfterViewInit, returns the HeaderComponent object
    this.roomList = this.roomService.getRooms();  // the data is rendered from the service not the component.
  }

  ngAfterViewInit(): void {
    this.headerComponent.headerTitle = "Header Component View";
    this.headerChildren.last.headerTitle = "Last Component Title";  // returns HeaderComponent object
    // this.headerChildren.get(index).property = AssignSomeValue;
    this.headerChildren.forEach(comp => {
      console.log(comp.headerTitle);
    });
  }

  ngAfterViewChecked(): void {

  }

  toggle() {
    this.flag = !this.flag;
    this.title = "Rooms List";
  }

  selectTheRoom(room: RoomsList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const newRoom: RoomsList = {
      roomType: "Room 103",
      amenities: "Only water",
      photos: "Your photo here",
      price: 599.99,
      checkInTime: Date.now().toString(),
      checkOutTime: Date().toString(),

    };
    this.roomList = [...this.roomList, newRoom];  // ... => spread operator
  }
}
