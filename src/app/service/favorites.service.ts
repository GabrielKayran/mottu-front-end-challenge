import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favorites';
  private favorites: Array<Character> = [];
  private favoriteCountSubject: BehaviorSubject<number>;

  constructor() {
    const storedFavorites = localStorage.getItem(this.favoritesKey);
    this.favoriteCountSubject = new BehaviorSubject<number>(0);
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
      this.favoriteCountSubject.next(this.favorites.length);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
    this.favoriteCountSubject.next(this.favorites.length);
  }

  public getFavorites(): Array<Character> {
    return this.favorites;
  }

  public addFavorite(character: Character): void {
    if (!this.favorites.some((fav) => fav.id === character.id)) {
      this.favorites.push(character);
      this.saveFavorites();
    }
  }

  removeFavorite(character: Character): void {
    this.favorites = this.favorites.filter((fav) => fav.id !== character.id);
    this.saveFavorites();
  }

  getFavoriteCount(): Observable<number> {
    return this.favoriteCountSubject.asObservable();
  }
}
