import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomComponent } from './room/room.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomsBookingComponent } from './room/rooms-booking/rooms-booking.component';
import { AddRoomComponent } from './room/add-room/add-room.component';

export const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'rooms/add', component: AddRoomComponent, pathMatch: 'full' },
  { path: 'rooms/:id', component: RoomsBookingComponent },
  { path: 'rooms', component: RoomComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }, // Wild card routing
];
