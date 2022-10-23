import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/core/services/storage.service';
import { FavoriteFormComponent } from 'src/app/shared/components/favorite-form/favorite-form.component';
import { Favorite } from 'src/app/shared/models/favorite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public displayedColumns: any;
  public dataSource: any;
  public favorites: any;

  constructor(
    private _storageService: StorageService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    this.displayedColumns = ['Nombre', 'Alias','Fecha', 'Acciones'];
    this.dataSource = new MatTableDataSource<Element>(this.favorites);
    this.dataSource.paginator = this.paginator;
  }

  getFavorites() {
    if(this._storageService.keyExistsInLocalStorage('favorites')) {
      this.favorites = this._storageService.getItemFromLocalStorage('favorites');
    }
    else{
      this.favorites = [];
    }
    this.ngAfterViewInit();
  }

  deleteFavorite(favorite: any) {
    let newFavorites = this.favorites.filter((item: Favorite) => item.name !== favorite.name)
    this._storageService.clearLocalStorage('favorites');
    
    if(newFavorites.length > 0) {
      this._storageService.setArrayInLocalStorage('favorites', newFavorites);
      this.favorites = this._storageService.getItemFromLocalStorage('favorites');
      this.getFavorites();
      Swal.fire('Favoritos', `Se removio ${ favorite.name } del listado de favoritos.`, 'success');
    }

    if(newFavorites.length === 0) {
      newFavorites = [];
      this._storageService.setArrayInLocalStorage('favorites', newFavorites);
      this.favorites = this._storageService.getItemFromLocalStorage('favorites');
      this.getFavorites();
      Swal.fire('Favoritos', `Se removio ${ favorite.name } del listado de favoritos.`, 'success');
    }
  }

  update(favorite: any) {
    this._dialog.open(FavoriteFormComponent, {
      width: '500px',
      data: { favorite }
    })
  }

}
