import { Component, OnInit } from '@angular/core';
import { AllService } from '../../../services/all.service';
import { PetService } from '../../services/pet.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
    `
      #map {
        height: 180px;
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  long: any;
  lat: any;
  pets: any;
  map: any;

  constructor(
    private petService: PetService,
    private globalService: AllService
  ) {
    this.long = this.globalService.longlat[0];
    this.lat = this.globalService.longlat[1];
    this.petService.getNearByPets(this.long, this.lat).subscribe((data) => {
      this.pets = data.pets;
      this.pets.forEach((pet: any) => {
        const { location } = pet;
        const marker = L.marker([location[1], location[0]]).addTo(this.map);
        marker.bindPopup(`
        <p class="mb-1"> Pet name: ${pet.petName}</p>
        <p class="mb-1"> Breed: ${pet.breed} </p>
        <p class="mb-1"> Weight: ${pet.weight} </p>
        <p class="mb-1"> Price: ${pet.price} </p>
        `);
      });
    });
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([this.lat, this.long], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    const marker = L.marker([this.lat, this.long]).addTo(this.map);
    marker.bindPopup(`<p>Your location</p>`).openPopup();
  }
}
