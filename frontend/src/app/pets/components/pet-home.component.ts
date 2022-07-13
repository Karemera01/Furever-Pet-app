import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-home',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class PetHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
