import { Character } from './../../../../interfaces/character';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() character: Character = {
    id: 0,
    image: '',
    name: '',
    species: '',
  };
  @Input() fav: boolean = false;
  @Output() favChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  public toggleFav(): void {
    this.fav = !this.fav;
    this.favChange.emit(this.fav);
  }
}
