import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public favorites: Array<Character> = [];

  constructor() {}

  ngOnInit(): void {}

  public removeFavorite(id: number): void {
    this.favorites = this.favorites.filter((character) => character.id !== id);
  }
}
