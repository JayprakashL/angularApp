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

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent; // can access the HeaderComponent instance inside RoomComponent

  @ViewChildren(HeaderComponent) headerChildren!: QueryList<HeaderComponent>;


  constructor(@SkipSelf() private roomService: RoomService) { }

  // When using http, error is observed: Type 'Observable<Object>' is missing the following properties from type 'RoomsList[]'
  ngOnInit(): void {
    // console.log(this.headerComponent);
    this.roomService.getRooms().subscribe(rooms => {
      this.roomList = rooms;
    });
    // returns an Observable object.
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
      roomNumber: "Room 103",
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
