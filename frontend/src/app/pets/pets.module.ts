import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { PetListComponent } from './components/pet-list/pet-list.component';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { PetHomeComponent } from './components/pet-home.component';
import { SendRequestComponent } from './components/send-request/send-request.component';
import { PetComponent } from './components/pet/pet.component';
import { MapComponent } from './components/map/map.component';
import { ControleVisibilityDirective } from './controle-visibility.directive';
import { RemovePathPipe } from './remove-path.pipe';

const routes: Routes = [
  {
    path: '',
    component: PetHomeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PetListComponent },
      { path: 'add', component: AddPetComponent },
      { path: 'edit/:pet_id', component: EditPetComponent },
      { path: 'request-list/:pet_id', component: RequestListComponent },
      { path: 'send-request/:pet_id', component: SendRequestComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PetListComponent,
    AddPetComponent,
    EditPetComponent,
    RequestListComponent,
    PetHomeComponent,
    SendRequestComponent,
    PetComponent,
    MapComponent,
    ControleVisibilityDirective,
    RemovePathPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ],
  exports: [PetHomeComponent],
})
export class PetsModule {}
