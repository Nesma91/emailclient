import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEmail } from '../iemail';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @Input() email: IEmail = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: '',
  };
  @Output() emailSubmit = new EventEmitter();

  emailForm: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    // console.log(this.emailForm.getRawValue());

    this.emailSubmit.emit(this.emailForm.value);
  }
}
