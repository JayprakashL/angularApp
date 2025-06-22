import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomsList } from './room';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { RoomService } from './services/room.service';
import { Observable, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-room',
  imports: [CommonModule, RoomsListComponent, HeaderComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  // availableRooms = 20;
  occupiedRooms = 5;
  bookedRooms = 10;
  flag = true;

  title = 'Room Lists';

  subscription!: Subscription;

  selectedRoom!: RoomsList;

  rooms: Room = {
    availableRooms: 5,
    bookedRooms: 10,
    totalRooms: 20,
  };

  roomList: RoomsList[] = [];

  totalBytes = 0;

  // Creating a stream and subscribing it inside ngOnInit, may define the type in generics
  stream = new Observable((observer) => {
    observer.next('first');
    observer.next('second');
    observer.next('third');
    observer.complete();
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent; // can access the HeaderComponent instance inside RoomComponent

  @ViewChildren(HeaderComponent) headerChildren!: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private roomService: RoomService) {}

  room$!: Observable<RoomsList[]>; // will be initialized in ngOnInit, this will fetch from the function and no subscription is needed here

  subscription$!: Subscription; // will be initialized in ngOnInit

  ngOnInit(): void {
    this.room$ = this.roomService.getRooms$;
    this.subscription = this.roomService.getRooms$.subscribe((rooms) => {
      // manually subscribing to the stream
      this.roomList = rooms; // to avoid manual subscription, use shareReplay(1) of api call in the service and use method.
    });
    console.log(this.roomList);

    this.roomService.getPhotos().subscribe((event) => {
      console.log(event);
      // multiple events are called
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made.');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          console.log('Response with body is received with ' + this.totalBytes);
          break;
        }
        case HttpEventType.UploadProgress: {
          console.log('Response header and status has been sent.');
          break;
        }
        case HttpEventType.User: {
          console.log('Baigan was sent.');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Download Progress received.');
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
        default: {
          console.log('Default is called idk.');
        }
      }
    });
    this.stream.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data));
    // this.subscription = this.roomService.getRooms$.subscribe((rooms) => {
    // this.roomList = rooms;
    // });
    // this.roomService.getRooms$.subscribe((rooms) => {
    // this.roomList = rooms;
    // });
  }

  ngAfterViewInit(): void {
    this.headerComponent.headerTitle = 'Header Component View';
    this.headerChildren.last.headerTitle = 'Last Component Title'; // returns HeaderComponent object
    // this.headerChildren.get(index).property = AssignSomeValue;
    this.headerChildren.forEach((comp) => {
      console.log(comp.headerTitle);
    });
  }

  ngAfterViewChecked(): void {}

  toggle() {
    this.flag = !this.flag;
    this.title = 'Rooms List';
  }

  selectTheRoom(room: RoomsList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const newRoom: RoomsList = {
      roomNumber: 104,
      roomType: 'Business',
      amenities: 'All amenities',
      photos: 'Your photo here',
      price: 699,
      checkinTime: new Date('01-Mar-2025'),
      checkoutTime: new Date('01-Apr-2025'),
      rating: 4,
    };

    //this.roomList = [...this.roomList, newRoom];  // ... => spread operator
    this.roomService.addRooms(newRoom).subscribe((data) => {
      this.roomList = data;
    });
  }

  // updates the record from the matched roomNumber from RoomService
  editRoom() {
    const room: RoomsList = {
      roomNumber: 1,
      roomType: 'Business',
      amenities: 'All amenities',
      photos: 'Your photo here',
      price: 699,
      checkinTime: new Date('01-Mar-2025'),
      checkoutTime: new Date('01-Apr-2025'),
      rating: 4,
    };

    this.roomService.edit(room).subscribe((newRoom) => {
      this.roomList = newRoom;
    });
  }

  // deletes the record from the passed roomNumber Id
  deleteRoom() {
    this.roomService.deleteRoom('1').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
