import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/rick-morty/components/header/header.component';
import { HomeComponent } from './modules/rick-morty/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './modules/rick-morty/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from './modules/rick-morty/pages/favorites/favorites.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CardComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
