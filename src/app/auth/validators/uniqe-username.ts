import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqeUsername implements AsyncValidator {
  constructor(private http: HttpClient, private auth: AuthService) {}

  validate = (control: AbstractControl) => {
    const { value } = control;

    return this.auth.usernameAvailable(value).pipe(
      map((value) => {
        return null;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
