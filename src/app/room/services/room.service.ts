import { Inject, Injectable } from '@angular/core';
import { RoomsList } from '../room';
import { APP_SERVICE_CONF } from '../../app_config/appconfig.service';
import { AppConfig } from '../../app_config/appconfig.interface';

@Injectable({
  providedIn: 'root'
})

/* To avoid the import if multiple services/components wants to access, first creating an AppConfig containing the interface.
Import the constant exported and the Interface used inside the InjectionToken.
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

  constructor(@Inject(APP_SERVICE_CONF) private config : AppConfig) { 
    console.log(this.config.apiEndpoint);
    // console.log('API endpoint ' + env.apiEndpoint);  // accessing URL with importing the const
  }

  getRooms(){
    return this.roomList;
  }
}
