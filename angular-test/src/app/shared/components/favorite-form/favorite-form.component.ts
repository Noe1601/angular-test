import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/services/storage.service';
import { Favorite } from '../../models/favorite.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-favorite-form',
  templateUrl: './favorite-form.component.html',
  styleUrls: ['./favorite-form.component.css']
})
export class FavoriteFormComponent implements OnInit {

  public favoriteForm: FormGroup;
  private favorites: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _storageService: StorageService,
    private _dialog: MatDialog
  ) {

    this.favoriteForm = this._fb.group({
      alias: ['', Validators.required],
      name: ['', Validators.required],
      createdAt: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.disabledInputs();
    this.setDataInForm(this.data.favorite);
  }

  setDataInForm(data: Favorite) {
    this.favoriteForm.patchValue({
      alias: data.alias,
      name: data.name,
      createdAt: data.createdAt
    })
  }

  disabledInputs() {
    this.favoriteForm.get('name')?.disable();
    this.favoriteForm.get('createdAt')?.disable();
  }

  modifyFavorite() {
    const { alias } = this.favoriteForm.value;

    this.favorites = this._storageService.getItemFromLocalStorage('favorites');
    this.data.favorite.alias = alias;

    this.favorites.map((f: Favorite) => {
      if (f.name === this.data.favorite.name) {
        f.alias = alias
      }
    })

    this._storageService.clearLocalStorage('favorites');
    this._storageService.setArrayInLocalStorage('favorites', this.favorites);
    Swal.fire('Actualizando favorito', `Se modifico el alias de ${ this.data.favorite.name }.`, 'success');
    this._dialog.closeAll();
  }

}
