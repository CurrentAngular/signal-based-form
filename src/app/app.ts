import { Component, signal } from '@angular/core';

@Component({
  selector: 'sbf-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('signal-based-form');
}
