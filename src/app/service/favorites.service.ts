import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: Array<Character> = [];

  constructor() {}

  public getFavorites(): Array<Character> {
    return this.favorites;
  }

  public addFavorite(character: Character): void {
    if (!this.favorites.some((fav) => fav.id === character.id)) {
      this.favorites.push(character);
    }
  }

  removeFavorite(character: Character): void {
    this.favorites = this.favorites.filter((fav) => fav.id !== character.id);
  }

  getFavoriteCount(): number {
    return this.favorites.length;
  }
}
