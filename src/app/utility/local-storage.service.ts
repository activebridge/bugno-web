import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  get currentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    } catch (_) {
      return undefined;
    }
  }

  set currentUser(data) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data));
  }
}
