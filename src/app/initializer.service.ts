import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  config: any;

  constructor(private http: HttpClient) {}

  async initializer() {
    try {
      await firstValueFrom(
        this.http
          .get<any>('assets/config.json')
          .pipe(tap((config) => (this.config = config)))
      );
      return undefined;
    } catch (err) {
      console.error('Failed to load config.json in initializer:', err);
      return undefined;
    }
  }
}
