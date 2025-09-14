import { Component } from '@angular/core';
import { RoomsList } from '../room';
import { RoomService } from '../services/room.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-room',
  imports: [FormsModule, RouterModule, JsonPipe, CommonModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css',
})
export class AddRoomComponent {
  Date: any;
  constructor(private roomService: RoomService) {}

  room: RoomsList = {
    // Can pass this information to-from the template
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(new Date().getTime() + 86400000),
    rating: 0,
  };

  // roomList: RoomsList[] = [];

  successMessage: string = '';
  addRoom(roomsForm: NgForm) {
    //this.roomList = [...this.roomList, newRoom];  // ... => spread operator
    this.roomService.addRooms(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully!';
      console.log(data);
      // this.room = {
      //   roomType: '',
      //   amenities: '',
      //   price: 0,
      //   photos: '',
      //   checkinTime: new Date(),
      //   checkoutTime: new Date(new Date().getTime() + 86400000),
      //   rating: 0,
      // };
      // roomsForm.resetForm(this.room);
      roomsForm.reset();
    });
  }
}
