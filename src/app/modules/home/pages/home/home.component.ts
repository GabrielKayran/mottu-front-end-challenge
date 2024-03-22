import { Component, OnInit } from '@angular/core';
import { RickMortyApiService } from 'src/app/service/rick-morty-api.service';
import { Character } from 'src/app/interfaces/character';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
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
  public currentPage: number = 1;
  public totalPages: number = 0;
  private searchTermChanged: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.getCharacters(this.currentPage);

    this.searchTermChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term: string) => {
        this.searchCharacter(term, this.currentPage);
      });
  }

  public getCharacters(page: number = 1) {
    this.rickMortyApiService
      .getCharacters(page)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar personagens:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
      });
  }

  public searchCharacter(name: string, page: number) {
    if (name.trim() !== '') {
      this.rickMortyApiService
        .searchCharacter(name, page)
        .pipe(
          catchError((error) => {
            console.error('Erro ao buscar personagens:', error);
            return of(null);
          })
        )
        .subscribe((response) => {
          this.characters = response.results;
          this.totalPages = response.info.pages;
        });
    } else {
      this.characters = [];
      this.getCharacters(page);
    }
  }

  public isFav(character: Character): boolean {
    let favorites: Character[] = [];
    this.favoritesService
      .getFavorites()
      .subscribe((favs) => (favorites = favs));
    return favorites.some((fav) => fav.id === character.id);
  }

  public updateFav(isFav: boolean, character: Character) {
    if (isFav) {
      this.favoritesService.addFavorite(character);
    } else {
      this.favoritesService.removeFavorite(character);
    }
  }

  public onPageChanged(page: number): void {
    const nextPage = Math.max(1, Math.min(page, this.totalPages));
    this.currentPage = nextPage;
    if (this.searchTerm.trim() === '') {
      this.getCharacters(page);
    } else {
      this.searchCharacter(this.searchTerm, page);
    }
  }

  public onSearchTermChanged(term: string): void {
    this.searchTermChanged.next(term);
  }
}
