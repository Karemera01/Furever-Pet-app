import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { AllService } from '../../services/all.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [
    `
      .customContainer {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      body {
        height: 100%;
      }
    `,
  ],
})
export class SigninComponent implements OnInit {
  signForm: FormGroup;
  // validSignIn!: string;

  constructor(
    private fb: FormBuilder,
    private service: AllService,
    private router: Router
  ) {
    this.signForm = fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [Validators.required],
        // [this.validSign().bind(this)]
      ],
    });
  }

  ngOnInit(): void {}

  validSign(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const email = this.signForm.get('email')?.value;
      const signInForm = {
        password: control.value,
      };
      return this.service.validateSignIn(email, signInForm).pipe(
        debounceTime(1000),
        map((res) => {
          console.log(control.value);
          if (res._id) {
            return { validCred: true };
          } else {
            return { validCred: false };
          }
        })
      );
    };
  }
  handleSignin() {
    this.service.signIn(this.signForm.value).subscribe((data) => {
      console.log(data);
      if (data.token) {
        this.service.jwt = data.token;
        this.service.decodeToken(data.token);
        localStorage.setItem('token', this.service.jwt);
        location.pathname = '/pets/list';
        // this.router.navigate(['pets']);
      }
    });
  }
}
