import { AfterViewChecked, AfterViewInit, Component, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomsList } from './room';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { RoomService } from './services/room.service';
import { Observable } from 'rxjs';

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

  // Creating a stream and subscribing it inside ngOnInit, may define the type in generics
  stream = new Observable(observer => {
    observer.next('first');
    observer.next('second');
    observer.next('third');
    observer.complete();
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent; // can access the HeaderComponent instance inside RoomComponent

  @ViewChildren(HeaderComponent) headerChildren!: QueryList<HeaderComponent>;


  constructor(@SkipSelf() private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(rooms =>{
      this.roomList =  rooms;
    });
    this.stream.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    });
    this.stream.subscribe((data) => console.log(data));
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
      roomNumber: "104",
      roomType: "Business",
      amenities: "All amenities",
      photos: "Your photo here",
      price: 699,
      checkInTime: new Date('01-Mar-2025'),
      checkOutTime: new Date('01-Apr-2025'),
      ratings: 4
    };
    
    //this.roomList = [...this.roomList, newRoom];  // ... => spread operator
    this.roomService.addRooms(newRoom).subscribe((data) => {
      this.roomList = data;
    })
  }
}
