import { Injectable } from '@angular/core';
import { RoomsList } from '../room';

@Injectable({
  providedIn: 'root'
})

/* Dependency Injection (DI) is a design pattern which can be injected inside a component/service.
    It contains a hierarchy of levels which checks the service being injected.
*/

export class RoomService {

  roomList: RoomsList[] = [{
    roomType: "Room 101",
    amenities: "Light, Water, AC",
    price: 59.99,
    photos: "string",
    checkInTime: new Date('11-Nov-2021').toString(),
    checkOutTime: new Date('12-Nov-2021').toString()
  },
  {
    roomType: "Room 102",
    amenities: "Light, Water, AC, King Size Bed",
    price: 109.99,
    photos: "string",
    checkInTime: new Date('11-Nov-2021').toString(),
    checkOutTime: new Date('12-Nov-2021').toString()
  }]

  constructor() { 
    console.log('Constructor of room service is initialized');
  }

  getRooms(){
    return this.roomList;
  }
}
