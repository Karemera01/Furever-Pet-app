import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AllService } from 'src/app/services/all.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styles: [],
})
export class PetComponent implements OnInit {
  @Input() pet: any;
  pets: any;
  user: any;
  subscription!: Subscription;

  constructor(
    private globalService: AllService,
    private petService: PetService,
    private router: Router
  ) {
    this.pets = this.petService.pets;
    this.user = this.globalService.user;
  }

  ngOnInit(): void {}
  handleEdit() {
    this.router.navigate(['/pets/edit/', this.pet._id]);
  }
  handleDelete() {
    this.subscription = this.petService
      .deletePet(this.pet._id)
      .subscribe((data) => console.log(data));
    location.pathname = '/pets/list';
  }
  handleSendRequest() {
    this.router.navigate(['/pets/send-request/', this.pet._id]);
  }
  handleRequestList() {
    this.router.navigate(['/pets/request-list/', this.pet._id]);
  }
  handleMarkAdopted(adopt: boolean) {
    const pet: any = { adopted: true };
    this.petService
      .editPet(pet, this.pet._id)
      .subscribe((data) => console.log(data));
    location.pathname = '/pets/list';
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
