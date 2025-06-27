import { Inject, Injectable } from '@angular/core';
import { RoomsList } from '../room';
import { APP_SERVICE_CONF } from '../../app_config/appconfig.service';
import { AppConfig } from '../../app_config/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, shareReplay, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  getRooms$!: Observable<RoomsList[]>; // $ is used for Streams
  roomList: RoomsList[] = [];

  constructor(
    @Inject(APP_SERVICE_CONF) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndpoint);
    this.getRooms$ = this.http
      .get<RoomsList[]>('/api/room') // creating an error of http call
      .pipe(shareReplay(1));
    // .pipe() allows to modify the stream. The request called will be cached // getRooms is a property and '$' denotes that property is a stream
  }

  getRooms() {
    return this.http.get<RoomsList[]>('/api/rooms');
  }

  addRooms(room: RoomsList) {
    return this.http.post<RoomsList[]>('/api/rooms', room);
  }

  edit(room: RoomsList) {
    return this.http.put<RoomsList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomsList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    return this.http.get('https://jsonplaceholder.typicode.com/photos', {
      observe: 'events',
      reportProgress: true,
    });
  }
}
