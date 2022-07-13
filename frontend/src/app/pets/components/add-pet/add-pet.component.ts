import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from '../../../services/all.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
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
export class AddPetComponent implements OnInit {
  addPetForm: FormGroup;
  imageFile: any;
  numberRegEx = /\-?\d*\.?\d{1,2}/;

  constructor(
    private fb: FormBuilder,
    private service: PetService,
    private gs: AllService,
    private router: Router
  ) {
    this.addPetForm = fb.group({
      petName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      expectedSize: [
        '',
        [Validators.required, Validators.pattern(this.numberRegEx)],
      ],
      price: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      weight: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      img: [''],
      parentBreed: this.fb.group({
        mom: ['', [Validators.required]],
        dad: ['', [Validators.required]],
      }),
      long: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      lat: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
    });
  }

  ngOnInit(): void {}
  handleFileEvent(event: any) {
    this.addPetForm.get('img')?.setValue(event.target.files[0]);
    // this.imageFile = event.target.files[0];
  }
  handleAddPet() {
    const location = [
      this.addPetForm.controls['long'].value,
      this.addPetForm.controls['lat'].value,
    ];
    const formData = new FormData();

    const petForm = {
      user_Id: this.gs.user.userId,
      petName: this.addPetForm.controls['petName'].value,
      birthDate: this.addPetForm.controls['birthDate'].value,
      breed: this.addPetForm.controls['breed'].value,
      expectedSize: this.addPetForm.controls['expectedSize'].value,
      price: this.addPetForm.controls['price'].value,
      weight: this.addPetForm.controls['weight'].value,
      parentBreed: this.addPetForm.controls['parentBreed'].value,
      location,
    };

    this.service.addPet(petForm).subscribe((data) => console.log(data));
    this.router.navigate(['pets/list']);
    window.location.pathname = '/pets/list';
  }
}
