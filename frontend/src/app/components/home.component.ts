import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="customContainer">
      <h1 class="h1">Welcome to Our Site</h1>
      <p class="mt-3">
        <a class="btn btn-light" routerLink="signin">Sign In to get Started</a>
      </p>
      <p class="mt-3">Do not have an account</p>
      <p class="mt-3">
        <a class="btn btn-light" routerLink="signup">Sign up Here</a>
      </p>
    </div>
  `,
  styles: [
    `
      body {
        height: 100%;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
