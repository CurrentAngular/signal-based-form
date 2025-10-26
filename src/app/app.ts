import { Component, signal } from '@angular/core';
import { User } from './user.interface';
import { Control, form } from '@angular/forms/signals';

@Component({
  selector: 'sbf-root',
  imports: [Control], // Control - новая директива, которая привязывает созданную модкль формы с шаблоном
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Созадли модель на основе интерфейса User
  protected readonly user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    notify: false,
  });

  // Используем функцию form для создания формы на основе модели
  protected readonly userForm = form(this.user);

  onSubmit(event: Event): void {
    event.preventDefault();
  }

  constructor() {
    // Пример, как можно обращаться к конкретному контролу формы и изменять его значение
    // this.userForm.firstName().value.set('Gosha');
  }
}
