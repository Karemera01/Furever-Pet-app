import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styles: [],
})
export class RequestListComponent implements OnInit {
  subscription: Subscription;
  pet_id!: any;
  adoptionRequests: any;
  page: number = 1;
  itemsPerPage = 3;
  totalItems: any;
  constructor(
    private activated: ActivatedRoute,
    private petService: PetService
  ) {
    this.subscription = this.activated.paramMap.subscribe(
      (params: ParamMap) => {
        this.pet_id = params.get('pet_id');
        const pet = this.petService.pets.find(
          (item: any) => item._id === this.pet_id
        );
        this.adoptionRequests = pet.adoptionRequests;
        this.totalItems = pet.adoptionRequests.length;
      }
    );
  }

  ngOnInit(): void {}
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
