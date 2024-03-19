import { Character } from './../../../../interfaces/character';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  public fav: boolean = true;
  @Input() character: Character = {
    id: 0,
    image: '',
    name: '',
    species: '',
  };
  constructor() {}

  ngOnInit(): void {}

  public toggleFav(): void {
    this.fav = !this.fav;
  }
}
