import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Favorite } from 'src/app/shared/models/favorite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  public displayedColumns: any;
  public dataSource: any;
  public pokemons: any;
  public favorites: any;

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    this.displayedColumns = ['Nombre', 'Url Detalle', 'Acciones'];
    this.dataSource = new MatTableDataSource<Element>(this.pokemons);
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private _pokemonService: PokemonService,
    private _storageService: StorageService
    ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {

    if(this._storageService.keyExistsInLocalStorage('favorites')) {
      this.favorites = this._storageService.getItemFromLocalStorage('favorites');
    }
    else{
      this.favorites = [];
    }
    
    this._pokemonService.getAllPokemons(100000,0).subscribe(data => {
      this.pokemons = data.results;
      this.ngAfterViewInit();
    });
  }

  setFavorites(pokemon: any) {

    const newFavorite: Favorite = {
      name: pokemon.name,
      alias: pokemon.name,
      createdAt: new Date(),
      isFavorite: true
    };

    const favoriteExists = this.favorites.filter((f: Favorite) => f.name === newFavorite.name);

    if(favoriteExists.length === 0){
      this.favorites.push(newFavorite);
      this._storageService.setArrayInLocalStorage('favorites', this.favorites);  
      Swal.fire('Favoritos', `Se agrego ${ newFavorite.name } al listado de favoritos.`, 'success');
    }
    else
    {
      Swal.fire('Favoritos', 'Este pokemon ya esta en la lista de favoritos', 'info');
    }


  }

}