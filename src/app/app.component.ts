import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from "./employee/employee.component";

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet, RoomComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RoomComponent, ContainerComponent, EmployeeComponent]
})
export class AppComponent implements OnInit {   // Using ViewChild the static property is false, thus use AfterViewInit
  title = 'angularApp';
  role = 'baigan';

  constructor () {}

  // #user in app.component.html is a template reference which allows to access that html tag inside TS using ViewChild
  // ViewContainerRef will help us to dynamically load a component
  //@ViewChild('user', {read : ViewContainerRef}) vcr!: ViewContainerRef; 

  @ViewChild('templateName', {static : true}) divVcf!: ElementRef;  // Renders specific DOM elements

  ngOnInit(): void {
    // this.divVcf.nativeElement.innerText = "Element Reference Text";
    console.log(this.divVcf)
  }


  // ngAfterViewInit(): void {
  //   //const componentRef = this.vcr.createComponent(RoomComponent); // Pass any component, here passing RoomComponent
  //   // Using componentRef.instance. we can access any property or function of that component.
  //   const divRef = this.divVcf.nativeElement()
  //   console.log(componentRef);
  //   componentRef.instance.title = "ViewChild Title change";
  // }
}
