import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqeUsername } from '../validators/uniqe-username';

interface ISignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqeUsername,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.auth.signup(this.authForm.value as ISignupCredentials).subscribe({
      next: (response) => {
        //console.log(response)
        //navigate to some other route
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        //console.log(err);
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
