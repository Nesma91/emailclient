import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';
import { IEmail } from '../iemail';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: IEmail;

  constructor(private auth: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      text: '',
      html: '',
      from: `${auth.username}@angular-email.com`,
    };
  }

  ngOnInit(): void {}

  onSubmit(email: IEmail) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
