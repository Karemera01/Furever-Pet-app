import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/services/all.service';

import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styles: [
    `
      body {
        height: 100%;
      }
    `,
  ],
})
export class PetListComponent implements OnInit {
  url: string = 'http://localhost:8000/';
  pets: any;
  imageFile!: File;
  user: any;
  page: number = 1;
  itemsPerPage = 3;
  totalItems: any;
  constructor(
    private petService: PetService,
    private globalService: AllService
  ) {
    this.petService.getPets(this.page, this.itemsPerPage).subscribe((data) => {
      localStorage.setItem('pets', JSON.stringify(data.pets));
      this.pets = data.pets;
      if (data.total) {
        this.totalItems = data.total;
      }
    });
    this.user = this.globalService.user;
  }

  ngOnInit(): void {
    const pets = localStorage.getItem('pets');
    if (pets) {
      this.pets = JSON.parse(pets);
      this.petService.pets = JSON.parse(pets);
    }
  }
  handleFileEvent(event: any) {
    this.imageFile = <File>event.target.files[0];
  }
  handleUpload(pet_id: string) {
    const formData = new FormData();
    formData.append('img', this.imageFile, this.imageFile.name);
    this.petService
      .addImage(pet_id, formData)
      .subscribe((data) => console.log(data));
    window.location.pathname = '/pets/list';
  }

  getPets(page: any) {
    this.petService.getPets(page, this.itemsPerPage).subscribe((data) => {
      localStorage.setItem('pets', JSON.stringify(data.pets));
      this.pets = data.pets;
      if (data.total) {
        this.totalItems = data.total;
      }
    });
  }
}
