import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmail } from '../iemail';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email!: IEmail;

  constructor(private route: ActivatedRoute) {
    this.email = route.snapshot.data['email'];
    this.route.data.subscribe(({ email }) => {
      this.email = email as IEmail;
    });
  }

  ngOnInit(): void {}
}
