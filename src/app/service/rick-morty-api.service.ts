import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class RickMortyApiService {
  private url: string = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}`);
  }

  searchCharacter(name: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&name=${name}`);
  }
}
