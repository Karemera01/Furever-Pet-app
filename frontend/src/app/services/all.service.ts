import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import UserInterface from '../userInterface';

@Injectable({
  providedIn: 'root',
})
export class AllService {
  url: string = 'http://localhost:8000';
  jwt: any;
  user: any;
  longlat: any;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    const longlat = localStorage.getItem('longlat');
    if (user) {
      this.user = JSON.parse(user);
    }
    if (longlat) {
      this.longlat = JSON.parse(longlat);
    }
  }

  signUp(user: UserInterface): Observable<any> {
    return this.http.post(`${this.url}/users/signup`, user);
  }

  signIn(user: any): Observable<any> {
    return this.http.post(`${this.url}/users/signin`, user);
  }
  validateSignIn(email: any, user: any): Observable<any> {
    console.log(user);
    return this.http.post(`${this.url}/users/${email}`, user);
  }

  decodeToken(token: string): any {
    try {
      this.user = jwt_decode(token);
      localStorage.setItem('user', JSON.stringify(this.user));
      return;
    } catch (Error) {
      return null;
    }
  }
  isAuthenticated(): boolean {
    if (this.jwt) {
      return true;
    } else {
      return false;
    }
  }
}
