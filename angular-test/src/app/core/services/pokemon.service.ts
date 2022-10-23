import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemons } from 'src/app/shared/models/all-pokemons.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _http: HttpClient) { }

  getAllPokemons(limit: number, offset: number) : Observable<Pokemons> {
    return this._http.get<Pokemons>(`${ baseUrl }?limit=${ limit }&offset=${ offset }`);
  }
}
