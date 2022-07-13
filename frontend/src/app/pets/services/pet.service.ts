import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import PetInterface from '../petInerface';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  url: string = 'http://localhost:8000/pets';
  pets: any;

  constructor(private http: HttpClient) {}

  getSinglePet(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
  getPets(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.url}?page=${page}&limit=${limit}`);
  }
  getNearByPets(long: number, lat: number): Observable<any> {
    return this.http.get(`${this.url}?long=${long}&lat=${lat}`);
  }
  addPet(pet: any): Observable<any> {
    return this.http.post(this.url, pet);
  }
  editPet(pet: PetInterface, pet_id: string): Observable<any> {
    return this.http.put(`${this.url}/${pet_id}`, pet);
  }
  deletePet(pet_id: string): Observable<any> {
    return this.http.delete(`${this.url}/${pet_id}`);
  }
  addImage(pet_id: string, imageFile: any): Observable<any> {
    return this.http.patch(`${this.url}/${pet_id}`, imageFile);
  }
  sendRequest(pet_id: string, request: any): Observable<any> {
    return this.http.post(`${this.url}/${pet_id}/adoption-request`, request);
  }
}
