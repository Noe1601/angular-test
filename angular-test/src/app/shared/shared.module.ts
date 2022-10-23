import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteFormComponent } from './components/favorite-form/favorite-form.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

@NgModule({
  declarations: [FavoriteFormComponent, NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FavoriteFormComponent,
    NavbarComponent,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
