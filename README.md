# Sadavod - E-commerce приложение

Это Next.js приложение для электронной коммерции с Redux, Firebase и styled-components.

**Живая версия:** https://sadavod.onrender.com/

## Начало работы

Установите зависимости:

```bash
npm install
```

Запустите сервер разработки:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Тестирование

Проект включает полный набор тестов для компонентов, Redux slice и утилит.

### Запуск тестов

Для запуска всех тестов:
```bash
npm test
```

Для запуска тестов в режиме наблюдения (watch mode):
```bash
npm run test:watch
```

Для запуска тестов с отчетом покрытия кода:
```bash
npm run test:coverage
```

### Структура тестов

Тесты находятся в папке `test/` и включают:

1. **utils.test.js** - Тесты утилит валидации и форматирования
2. **cartSlice.test.js** - Тесты Redux slice для корзины
3. **wishlistSlice.test.js** - Тесты Redux slice для списка желаний
4. **filterSlice.test.js** - Тесты Redux slice для фильтров
5. **ItemCard.test.js** - Тесты компонента карточки товара
6. **CheckBox.test.js** - Тесты компонента чекбокса для фильтров
7. **QuantityPicker.test.js** - Тесты компонента выбора количества
8. **BetterLink.test.js** - Тесты компонента ссылки
9. **getItemById.test.js** - Тесты утилиты поиска товара по ID

### Технологии для тестирования

- **Jest** - фреймворк тестирования
- **React Testing Library** - утилиты для тестирования React компонентов
- **jest-environment-jsdom** - среда выполнения для браузерных тестов

## Архитектура

- **Next.js** - React фреймворк
- **Redux Toolkit** - управление состоянием
- **styled-components** - стилизация
- **Firebase** - аутентификация и база данных

## Команды

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm start` - запуск продакшен сервера
- `npm run lint` - проверка кода
- `npm test` - запуск тестов
- `npm run test:watch` - тесты в режиме наблюдения
- `npm run test:coverage` - тесты с покрытием

## Решение проблем

### Ошибка "EMFILE: too many open files" на macOS

Если при запуске `npm run test:watch` возникает ошибка с лимитом файлов, выполните:

```bash
# Увеличить лимит открытых файлов для текущей сессии
ulimit -n 65536

# Или добавить в ~/.zshrc для постоянного применения
echo 'ulimit -n 65536' >> ~/.zshrc
``` 