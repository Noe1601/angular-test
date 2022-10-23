import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    PokemonsComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class ModulesModule { }
