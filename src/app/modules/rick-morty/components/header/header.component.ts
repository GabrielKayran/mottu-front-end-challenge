import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/service/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public favoriteCount: number = 0;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavoriteCount();
  }

  public getFavoriteCount() {
    this.favoriteCount = this.favoritesService.getFavoriteCount();
  }
  public isActive(route: string): boolean {
    return this.router.url === route;
  }
}
