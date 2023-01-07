import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { IEmail } from './iemail';
import { EmailService } from './email.service';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<IEmail> {
  constructor(private emailService: EmailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        return EMPTY;
      })
    );
  }
}
