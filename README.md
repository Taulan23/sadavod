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

## Дополнительная документация

- **[EXAMPLES.md](./EXAMPLES.md)** - Практические примеры кода для всех технологий
- **[CHEATSHEET.md](./CHEATSHEET.md)** - Шпаргалка с командами и горячими клавишами

### Технологии для тестирования

- **Jest** - фреймворк тестирования
- **React Testing Library** - утилиты для тестирования React компонентов
- **jest-environment-jsdom** - среда выполнения для браузерных тестов

## Архитектура и Технологии

### Frontend Framework
- **Next.js** - React фреймворк для production-ready приложений с SSR/SSG
- **React** - библиотека для создания пользовательских интерфейсов

### State Management (Управление состоянием)
- **Redux Toolkit** - современный способ работы с Redux
- **Redux Slice** - функция для создания редьюсеров и экшенов одновременно

### Стилизация
- **styled-components** - CSS-in-JS библиотека для стилизации React компонентов

### Backend & Database
- **Firebase** - платформа для аутентификации и хранения данных

### Тестирование
- **Jest** - JavaScript фреймворк для тестирования
- **React Testing Library** - утилиты для тестирования React компонентов
- **jsdom** - реализация DOM для Node.js окружения

## Глоссарий терминов

### Redux Терминология

**Redux Slice** - это функция из Redux Toolkit, которая автоматически генерирует action creators и action types на основе имен редьюсеров. Упрощает создание Redux логики.

```javascript
// Пример slice
const cartSlice = createSlice({
  name: 'cart',           // Имя slice
  initialState: {...},    // Начальное состояние
  reducers: {             // Редьюсеры (функции изменения состояния)
    addItem: (state, action) => { ... },
    removeItem: (state, action) => { ... }
  }
})
```

**Action** - объект, описывающий что произошло в приложении:
```javascript
{ type: 'cart/addItem', payload: { id: 1, name: 'Product' } }
```

**Reducer** - чистая функция, которая принимает предыдущее состояние и action, возвращает новое состояние:
```javascript
(previousState, action) => newState
```

**Store** - объект, который содержит состояние приложения и методы для его изменения.

**Dispatch** - метод для отправки actions в store.

### Тестирование

**Unit Testing** - тестирование отдельных модулей/функций в изоляции.

**Integration Testing** - тестирование взаимодействия между компонентами.

**Test Suite** - группа связанных тестов (describe блок).

**Test Case** - отдельный тест (test/it функция).

**Mock** - имитация зависимостей для изоляции тестируемого кода:
```javascript
// Мок функции
const mockFunction = jest.fn()

// Мок модуля
jest.mock('../components/Component')
```

**Assertion** - проверка ожидаемого результата:
```javascript
expect(result).toBe(expectedValue)
expect(element).toBeInTheDocument()
```

### Next.js Термины

**SSR (Server-Side Rendering)** - рендеринг страниц на сервере.

**SSG (Static Site Generation)** - генерация статических страниц во время сборки.

**API Routes** - серверные эндпоинты в Next.js приложении.

**getStaticProps/getServerSideProps** - функции для получения данных на этапе рендеринга.

### React Термины

**Component** - переиспользуемый элемент UI:
```javascript
const Component = ({ props }) => <div>{props.children}</div>
```

**Props** - свойства, передаваемые в компонент.

**State** - локальное состояние компонента.

**Hook** - функции для использования состояния и других возможностей React:
```javascript
const [state, setState] = useState(initialValue)
const dispatch = useDispatch()
const selector = useSelector(state => state.cart)
```

**JSX** - синтаксическое расширение JavaScript для описания UI.

### Styled Components

**CSS-in-JS** - подход к стилизации, где CSS пишется внутри JavaScript:
```javascript
const StyledDiv = styled.div`
  color: blue;
  padding: 10px;
`
```

**Template Literals** - шаблонные строки с интерполяцией:
```javascript
const StyledButton = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
`
```

### Testing Library

**render()** - функция для рендеринга компонента в тестовой среде.

**screen** - объект с методами для поиска элементов:
```javascript
screen.getByText('Button')
screen.getByRole('button')
screen.getByTestId('my-element')
```

**fireEvent** - утилита для симуляции пользовательских событий:
```javascript
fireEvent.click(button)
fireEvent.change(input, { target: { value: 'text' } })
```

**act()** - обертка для синхронизации с React обновлениями.

### Package.json Scripts

**npm test** - запуск всех тестов один раз.

**npm run test:watch** - запуск тестов в режиме наблюдения (перезапуск при изменениях).

**npm run test:coverage** - запуск тестов с отчетом покрытия кода.

### Файловая структура

```
/components     - React компоненты
/pages         - страницы Next.js приложения
/store         - Redux slice файлы
/utils         - вспомогательные функции
/test          - тестовые файлы
/public        - статические файлы (изображения, иконки)
```

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