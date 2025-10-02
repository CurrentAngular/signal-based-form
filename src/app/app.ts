import { Component, signal } from '@angular/core';
import { User } from './user.interface';
import { Control, form } from '@angular/forms/signals';

@Component({
  selector: 'sbf-root',
  imports: [Control],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    notify: false,
  });

  protected readonly form = form(this.user);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    console.log(event);
  }
}
