import { Component } from '@angular/core';
import { RoomsList } from '../room';
import { RoomService } from '../services/room.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-room',
  imports: [FormsModule, RouterModule, JsonPipe, CommonModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css',
})
export class AddRoomComponent {
  constructor(private roomService: RoomService) {}

  room: RoomsList = {
    // Can pass this information to-from the template
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  };

  // roomList: RoomsList[] = [];

  successMessage: string = '';
  addRoom() {
    //this.roomList = [...this.roomList, newRoom];  // ... => spread operator
    this.roomService.addRooms(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully!';
      console.log(data);
    });
  }
}
