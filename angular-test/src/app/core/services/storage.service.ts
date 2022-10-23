import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setArrayInLocalStorage(key: string, array: any) {
    localStorage.setItem(key, JSON.stringify(array));
  }

  getItemFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  keyExistsInLocalStorage(key: string) {
    return localStorage.getItem(key) ? true : false;
  }

  clearLocalStorage(key: string) {
    return localStorage.removeItem(key)
  }
}
