import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean | null>;

  constructor(private auth: AuthService) {
    this.signedin$ = this.auth.signedin$;
  }

  ngOnInit() {
    this.auth.checkAuth().subscribe(() => {});
  }
}
