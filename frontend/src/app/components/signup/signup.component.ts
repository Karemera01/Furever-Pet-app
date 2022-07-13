import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from '../../services/all.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
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
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AllService,
    private router: Router
  ) {
    this.signupForm = fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        role: ['buyer', Validators.required],
      },
      { validator: this.confirmRepassword }
    );
  }

  ngOnInit(): void {}

  confirmRepassword(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }
    return password &&
      confirmPassword &&
      password?.value !== confirmPassword?.value
      ? { notEqual: true }
      : null;
  }
  handleSignup() {
    this.service.signUp(this.signupForm.value).subscribe((data) => {
      if (data.msg === 'Account succesfully created') {
        this.success = true;
      }
    });
    setTimeout(() => {
      this.success = false;
      this.router.navigate(['/home/signin']);
    }, 2000);
  }
}
