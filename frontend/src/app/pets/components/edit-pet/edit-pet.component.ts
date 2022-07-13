import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
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
export class EditPetComponent implements OnInit {
  editPetForm: FormGroup;
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  subscription: Subscription;
  pet_id!: any;
  pet: any;

  constructor(
    private fb: FormBuilder,
    private activated: ActivatedRoute,
    private petService: PetService
  ) {
    this.subscription = this.activated.paramMap.subscribe(
      (params: ParamMap) => {
        this.pet_id = params.get('pet_id');
        this.pet = this.petService.pets.find(
          (item: any) => item._id === this.pet_id
        );
      }
    );

    this.editPetForm = this.fb.group({
      petName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      expectedSize: [
        '',
        [Validators.required, Validators.pattern(this.numberRegEx)],
      ],
      price: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      weight: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      parentBreed: this.fb.group({
        mom: ['', [Validators.required]],
        dad: ['', [Validators.required]],
      }),
      long: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      lat: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
    });
  }

  ngOnInit(): void {
    this.editPetForm.get('petName')?.setValue(this.pet.petName);
    // this.editPetForm.get('birthDate')?.setValue(this.pet.birthDate);
    this.editPetForm.get('breed')?.setValue(this.pet.breed);
    this.editPetForm.get('expectedSize')?.setValue(this.pet.expectedSize);
    this.editPetForm.get('price')?.setValue(this.pet.price);
    this.editPetForm.get('weight')?.setValue(this.pet.weight);
    this.editPetForm.get('long')?.setValue(this.pet.location[0]);
    this.editPetForm.get('lat')?.setValue(this.pet.location[1]);
    this.editPetForm.get('parentBreed.mom')?.setValue(this.pet.parentBreed.mom);
    this.editPetForm.get('parentBreed.dad')?.setValue(this.pet.parentBreed.dad);
  }

  handleEditPet() {
    const location = [
      this.editPetForm.controls['long'].value,
      this.editPetForm.controls['lat'].value,
    ];

    const petForm = {
      petName: this.editPetForm.controls['petName'].value,
      birthDate: this.editPetForm.controls['birthDate'].value,
      breed: this.editPetForm.controls['breed'].value,
      expectedSize: this.editPetForm.controls['expectedSize'].value,
      price: this.editPetForm.controls['price'].value,
      weight: this.editPetForm.controls['weight'].value,
      parentBreed: this.editPetForm.controls['parentBreed'].value,
      location,
    };
    this.petService
      .editPet(petForm, this.pet_id)
      .subscribe((res) => console.log(res));

    window.location.pathname = '/pets/list';
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
