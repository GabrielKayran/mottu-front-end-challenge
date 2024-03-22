import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class RickMortyApiService {
  private url: string = 'https://rickandmortyapi.com/api/character/';
  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<Character[]> {
    return this.http.get<any>(`${this.url}?page=${page}`).pipe(
      map((response: any) => {
        return response.results;
      })
    );
  }

  searchCharacter(name: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.url}?name=${name}`);
  }
}
