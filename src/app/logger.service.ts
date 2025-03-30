import { Injectable } from '@angular/core';

@Injectable() // Removed providedIn
export class LoggerService {

  constructor() { }

  // Use only in Dev env not in Prod and removing providedIn will throw an exception
  logger(msg: string){
    console.log(msg);
  }
}
