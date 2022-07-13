import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styles: [
    `
      .customContainer {
        margin-top: 5rem;
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
export class SendRequestComponent implements OnInit {
  requestForm: FormGroup;
  pet_id: any;
  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private activated: ActivatedRoute,
    private router: Router
  ) {
    this.requestForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      comment: [''],
    });
    this.activated.paramMap.subscribe((param: ParamMap) => {
      this.pet_id = param.get('pet_id');
    });
  }

  ngOnInit(): void {}

  handleRequest() {
    this.petService
      .sendRequest(this.pet_id, this.requestForm.value)
      .subscribe((data) => console.log(data));
    this.router.navigate(['/pets/list']);
  }
}
