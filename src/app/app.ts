import { Component, signal } from '@angular/core';
import { User } from './user.interface';
import { Control, email, form, minLength, required } from '@angular/forms/signals';

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

  protected readonly form = form(this.user, (path) => {
    required(path.firstName, { message: 'This field is required' });
    minLength(path.firstName, 3, { message: 'Minimal length is 3 symbols' });

    required(path.lastName, { message: 'This field is required' });
    minLength(path.lastName, 3, { message: 'Minimal length is 3 symbols' });

    required(path.email, { message: 'This field is required' });
    email(path.email, { message: 'This is invalid email' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    console.log(event);
  }
}
