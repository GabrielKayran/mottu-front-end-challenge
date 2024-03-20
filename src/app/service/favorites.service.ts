import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favorites';
  private favorites: Array<Character> = [];

  constructor() {
    const storedFavorites = localStorage.getItem(this.favoritesKey);
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
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

  getFavoriteCount(): number {
    return this.favorites.length;
  }
}
