import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoomComponent } from './room/room.component';

import { EmployeeComponent } from './employee/employee.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { ContainerComponent } from './container/container.component';
import { InitializerService } from './initializer.service';
import { CommonModule } from '@angular/common';
import { AppNavComponent } from './app-nav/app-nav.component';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, RoomComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, AppNavComponent],
})
export class AppComponent implements OnInit {
  // Using ViewChild the static property is false, thus use AfterViewInit
  title = 'angularApp';
  role = 'baigan';

  constructor(
    @Optional() private logger: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitializerService
  ) {
    //this.localStorage.getItem('token');
    console.log(
      'Injected Initializer Service config:',
      this.initService.config
    );
  }

  // #user in app.component.html is a template reference which allows to access that html tag inside TS using ViewChild
  // ViewContainerRef will help us to dynamically load a component
  //@ViewChild('user', {read : ViewContainerRef}) vcr!: ViewContainerRef;

  @ViewChild('templateName', { static: true }) divVcf!: ElementRef; // Renders specific DOM elements

  ngOnInit(): void {
    // this.divVcf.nativeElement.innerText = "Element Reference Text";
    //this.logger.logger('AppComponent.ngOnInit()');
    const x = this.localStorage.getItem('AngularUser');
    console.log(x);
  }

  // ngAfterViewInit(): void {
  //   //const componentRef = this.vcr.createComponent(RoomComponent); // Pass any component, here passing RoomComponent
  //   // Using componentRef.instance. we can access any property or function of that component.
  //   const divRef = this.divVcf.nativeElement()
  //   console.log(componentRef);
  //   componentRef.instance.title = "ViewChild Title change";
  // }
}
