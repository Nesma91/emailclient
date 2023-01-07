import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IEmail } from '../iemail';
import { EmailService } from './../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnChanges {
  showModal = false;

  @Input() email!: IEmail;

  constructor(private emailService: EmailService) {}

  ngOnChanges(): void {
    const text = this.email.text.replace(/\n/gi, '\n ');

    this.email = {
      //...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n---------- ${this.email.from} wrote:\n> ${text}`,
    } as IEmail;
  }

  onSubmit(email: IEmail) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
