import { InjectionToken, Injector } from "@angular/core";

// Changed from 'any' to 'Storage | null'
export const localStorageToken = new InjectionToken<Storage | null>('local storage', {
    providedIn: 'root',
    factory() {
      return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null;
    },
  });
  
/*
Angular atm is throwing error of instance of localStorage being undefined and unable to reason as to why.
So currently setted the global object of nodeJS as window and through the global object the localStorage is being accessed.
However, this should not be the case as the localStorage should be accessible irrespective to the browser or the browsers supported by Angular 19.
*/
// const providers = [
//     {
//         provide: localStorageToken
//     }
// ];

// const injector = Injector.create({providers});

// const myInterface = injector.get(localStorageToken);