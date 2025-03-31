import { Inject, Injectable } from '@angular/core';
import { RoomsList } from '../room';
import { APP_SERVICE_CONF } from '../../app_config/appconfig.service';
import { AppConfig } from '../../app_config/appconfig.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/* To avoid the import if multiple services/components wants to access, first creating an AppConfig containing the interface.
Import the constant exported and the Interface used inside the InjectionToken.
*/

export class RoomService {

  roomList: RoomsList[] = [];

  constructor(@Inject(APP_SERVICE_CONF) private config : AppConfig, private http: HttpClient) { 
    console.log(this.config.apiEndpoint);
    // console.log('API endpoint ' + env.apiEndpoint);  // accessing URL with importing the const
  }

  // Using HttpClient
  getRooms(){
    return this.http.get<RoomsList[]>('/api/rooms');
  }
}
