import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from './services/all.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  token!: string;
  user: any;

  constructor(private service: AllService, private router: Router) {
    this.user = this.service.user;
    if (this.service.jwt) {
      this.token = this.service.jwt;
      localStorage.setItem('token', this.service.jwt);
    }
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      this.service.longlat = [long, lat];
      localStorage.setItem('longlat', JSON.stringify(this.service.longlat));
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.service.jwt = token;
    }
  }
  handleSignOut() {
    this.token = '';
    localStorage.clear();
    this.router.navigate(['']);
  }
}
