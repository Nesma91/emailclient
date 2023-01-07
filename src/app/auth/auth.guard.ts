import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.signedin$.pipe(
      skipWhile((value: any) => {
        return value === null;
      }),
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
