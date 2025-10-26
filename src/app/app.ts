import { Component, signal } from '@angular/core';
import { User } from './user.interface';
import { Control, email, form, minLength, required } from '@angular/forms/signals';

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
  // Первый аргумент этой функции - сигнальная модель
  // Второй аргумент - функция для валидации контролов формы; эта функция как аргумент принимает форму
  // и для каждого типа валидации - вызывает вспомогательную функцию
  // например - required или minLength или email - в которую передает нужный контрол формы
  // ---
  // в терминологии signal form - валидация это -> field logic
  protected readonly userForm = form(this.user, (form) => {
    required(form.firstName, { message: 'This field is required!' }); // задаем в объекте свое кастомное сообщение ошибки
    minLength(form.firstName, 2, { message: 'This field must have 2 symbols length' }); // задаем в объекте свое кастомное сообщение ошибки

    required(form.lastName, { message: 'This field is required!' }); // задаем в объекте свое кастомное сообщение ошибки
    minLength(form.lastName, 3, { message: 'This field must have 3 symbols length' }); // задаем в объекте свое кастомное сообщение ошибки

    required(form.email, { message: 'This field is required!' }); // задаем в объекте свое кастомное сообщение ошибки
    email(form.email, { message: 'This field must be email pattern' }); // задаем в объекте свое кастомное сообщение ошибки
  });

  onSubmit(event: Event): void {
    event.preventDefault();
  }

  constructor() {
    // Пример, как можно обращаться к конкретному контролу формы и изменять его значение
    // this.userForm.firstName().value.set('Gosha');
  }
}
