import { Component, OnInit } from '@angular/core';
import { RickMortyApiService } from 'src/app/service/rick-morty-api.service';
import { Character } from 'src/app/interfaces/character';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private rickMortyApiService: RickMortyApiService) {}

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
}
