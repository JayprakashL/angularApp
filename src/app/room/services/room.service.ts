import { Inject, Injectable } from '@angular/core';
import { RoomsList } from '../room';
import { APP_SERVICE_CONF } from '../../app_config/appconfig.service';
import { AppConfig } from '../../app_config/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RoomService {

  roomList: RoomsList[] = [];

  constructor(@Inject(APP_SERVICE_CONF) private config : AppConfig, private http: HttpClient) { 
    console.log(this.config.apiEndpoint);
  }

  // Syntax changed of accessing the getRooms(), previously it was
  // getRooms$ = http.get<RoomsList[]>('/api/rooms').pipe(shareReplay(1));
  get getRooms$(){  // getRooms is a property and '$' denotes that property is a stream
    return this.http.get<RoomsList[]>('/api/rooms').pipe(   // .pipe() allows to modify the stream. The request called will be cached
      shareReplay(1)
    );
  } 

  getRooms(){
    return this.http.get<RoomsList[]>('/api/rooms');
  }

  addRooms(room: RoomsList){
    return this.http.post<RoomsList[]>('/api/rooms', room);
  }

  edit(room: RoomsList){
    return this.http.put<RoomsList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  deleteRoom(id: string){
    return this.http.delete<RoomsList[]>(`/api/rooms/${id}`);
  }

  // getPhotos(){
  //   const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {reportProgress: true});
  //   return this.http.request(request);
  // }
}
