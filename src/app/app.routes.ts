import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomComponent } from './room/room.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'rooms', component: RoomComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }, // Wild card routing
];
