import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-home></app-home>
    <!-- <app-favorites></app-favorites> -->
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'front-end-challenge';
}
