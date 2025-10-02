import { Component, signal } from '@angular/core';
import { User } from './user.interface';
import {
  apply,
  Control,
  email,
  form,
  minLength,
  required,
  Schema,
  schema,
} from '@angular/forms/signals';

const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: 'This field is required' });
  minLength(path, 3, { message: 'Minimal length is 3 symbols' });
});

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
    apply(path.firstName, nameSchema);
    apply(path.lastName, nameSchema);

    required(path.email, { message: 'This field is required' });
    email(path.email, { message: 'This is invalid email' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    console.log(event);
  }
}
