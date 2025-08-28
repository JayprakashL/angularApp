import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  imports: [AsyncPipe],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.css',
})
export class RoomsBookingComponent {
  constructor(private router: ActivatedRoute) {}

  id: number = 0;

  id$!: Observable<number>;

  ngOnInit(): void {
    // Router's data is a service
    // this.router.params.subscribe((params) => {
    //   console.log(params);
    //   this.id = params['id'];
    // });
    // Using params
    // this.id$ = this.router.params.pipe(map((params) => params['id']));
    // console.log(this.id$);
    // Using paramMap
    this.id$ = this.router.paramMap.pipe(
      map((params) => {
        const roomId = params.get('id');
        return roomId !== null ? Number(roomId) : 0; // type changed from number to string
      })
    );
  }
}
