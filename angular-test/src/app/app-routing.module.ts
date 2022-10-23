import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './modules/favorites/favorites.component';
import { PokemonsComponent } from './modules/pokemons/pokemons.component';

const routes: Routes = [
  { path: 'list', component: PokemonsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
