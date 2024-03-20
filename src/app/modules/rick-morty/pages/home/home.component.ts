import { Component, OnInit } from '@angular/core';
import { RickMortyApiService } from 'src/app/service/rick-morty-api.service';
import { Character } from 'src/app/interfaces/character';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoritesService } from 'src/app/service/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private rickMortyApiService: RickMortyApiService,
    private favoritesService: FavoritesService
  ) {}

  public results: any = [];
  public searchTerm: string = '';
  public characters: Array<Character> = [];
  public character: Character = {
    id: 0,
    image: '',
    name: '',
    species: '',
  };

  ngOnInit(): void {
    this.getCharacters();
  }

  public getCharacters() {
    this.rickMortyApiService.getCharacters().subscribe((response) => {
      this.results = response;
      this.characters = this.results.results;
    });
  }

  public getCharacter(id: number) {
    this.rickMortyApiService.getCharacter(id).subscribe((response) => {
      this.character = response;
    });
  }

  public searchCharacter(name: string) {
    if (name.trim() !== '') {
      this.rickMortyApiService
        .searchCharacter(name)
        .pipe(
          catchError(() => {
            this.characters = [];
            return of([]);
          })
        )
        .subscribe((response) => {
          this.results = response;
          this.characters = this.results.results;
        });
    } else {
      this.getCharacters();
    }
  }

  public isFav(character: Character): boolean {
    return this.favoritesService
      .getFavorites()
      .some((fav) => fav.id === character.id);
  }
  public updateFav(isFav: boolean, character: Character) {
    if (isFav) {
      this.favoritesService.addFavorite(character);
    } else {
      this.favoritesService.removeFavorite(character);
    }
  }
}
