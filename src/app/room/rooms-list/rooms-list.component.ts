import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomsList } from '../room';

@Component({
  selector: 'app-rooms-list',
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // OnPush change detection can only be applied if any internal data is not modified in this component
  // the change detection strategy when pushing a data should not be mutable.
  // and immutable object should return a new instance, i.e. when modifying the object new instance of that object should be returned.
  // <app-rooms-list> has ChangeDetectionStrategy.OnPush the change detection tree will check <app-rooms-list> component and make the changes inside <app-rooms-list> component only.
  // The data should be coming from parent component only and property should be immutable.
  // ngOnChanges can be applied on a component/directive which has input property.
  // It can be used to modify some property after getting input values inside ngOnChanges.
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  // Get the Data of Rooms List
  // The property 'rooms' on the HTML tag <app-rooms-list>
  @Input() rooms: RoomsList[] | null = []; // used in async pipe as stream can return null or undefined

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomsList>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {}

  selectRoom(room: RoomsList) {
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy is called');
  }
}
