import { Component, signal } from '@angular/core';
import { User } from './user.interface';
import { apply, Control, email, form, minLength, required, schema } from '@angular/forms/signals';

// При помощи функции schema - созадем схему, функцию, которая хранит в себе логику валидации контрола
// преимущество такой схемы - вынесение логики валидации в отдельный скоуп и возможность переиспользования такой функции
// <string> - говорим, что данная схема может быть применена только к контролам с типом string
export const namesSchema = schema<string>((control) => {
  required(control, { message: 'This field is required!' });
  minLength(control, 2, { message: 'This field must have 2 symbols length' });
});

@Component({
  selector: 'sbf-root',
  imports: [Control], // Control - новая директива, которая привязывает созданную модель формы с шаблоном
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Создали signal-модель на основе интерфейса User
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
    // применяем созданную схему - к конкретным контролам
    apply(form.firstName, namesSchema);
    apply(form.lastName, namesSchema);

    // Валидатор по условию
    // when - хранит в себе функцию, которая принимает как аргумент контекст, у которого есть функция valueOf, которая возвращает значение указанного контрола
    // данный валидатор применится к form.email тольуо тогда, когда значение контрола form.notify будет равно true
    required(form.email, {
      when: (ctx) => ctx.valueOf(form.notify) === true,
      message: 'This field is required!',
    });
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
