# Шпаргалка по командам и горячим клавишам

## NPM команды

### Основные команды разработки
```bash
npm install          # Установить зависимости
npm run dev          # Запуск в режиме разработки (localhost:3000)
npm run build        # Сборка для продакшена
npm start            # Запуск продакшен сервера
npm run lint         # Проверка кода ESLint
```

### Команды тестирования
```bash
npm test             # Запуск всех тестов один раз
npm run test:watch   # Тесты в режиме наблюдения
npm run test:coverage # Тесты с отчетом покрытия кода
```

## Jest команды в watch режиме

Когда запущен `npm run test:watch`, доступны следующие команды:

```
a - запустить все тесты
f - запустить только неудачные тесты
p - фильтр по имени файла (regex)
t - фильтр по названию теста (regex)
q - выйти из watch режима
Enter - перезапустить тесты
```

## Git команды

### Основные команды
```bash
git status           # Статус репозитория
git add .            # Добавить все изменения
git commit -m "..."  # Создать коммит
git push             # Загрузить изменения на GitHub
git pull             # Скачать изменения с GitHub
```

### Полезные команды
```bash
git log --oneline    # История коммитов
git diff             # Показать изменения
git checkout -b feature # Создать новую ветку
git merge feature    # Слить ветку
```

## VS Code горячие клавиши

### Навигация
```
Cmd+P (Mac) / Ctrl+P (Win) - Быстрый поиск файлов
Cmd+Shift+P - Палитра команд
Cmd+B - Показать/скрыть боковую панель
Cmd+J - Показать/скрыть терминал
```

### Редактирование
```
Cmd+D - Выделить следующее вхождение
Cmd+Shift+L - Выделить все вхождения
Alt+Click - Множественный курсор
Cmd+/ - Комментировать строку
Shift+Alt+F - Форматировать документ
```

### Отладка и тестирование
```
F5 - Запустить отладку
Cmd+Shift+` - Новый терминал
Ctrl+` - Показать/скрыть терминал
```

## React DevTools

### Основные возможности
- **Components tab** - дерево компонентов с пропсами и стейтом
- **Profiler tab** - анализ производительности
- **Search** - поиск компонентов по имени

### Полезные фичи
- Изменение пропсов в реальном времени
- Просмотр хуков и их состояния
- Анализ причин перерендера

## Redux DevTools

### Основные вкладки
- **Actions** - список всех отправленных actions
- **State** - текущее состояние store
- **Diff** - изменения между состояниями

### Полезные функции
- **Time Travel** - возврат к предыдущим состояниям
- **Dispatch** - отправка actions вручную
- **Export/Import** - сохранение и загрузка состояния

## Debugging в браузере

### Console методы
```javascript
console.log()        # Обычный вывод
console.warn()       # Предупреждение
console.error()      # Ошибка
console.table()      # Таблица для массивов/объектов
console.time()       # Начать замер времени
console.timeEnd()    # Закончить замер времени
```

### Breakpoints
```
F12 - Открыть DevTools
F8 - Продолжить выполнение
F10 - Шаг через
F11 - Шаг внутрь
Shift+F11 - Шаг наружу
```

## Jest Testing матчеры

### Основные матчеры
```javascript
expect(value).toBe(4)                    # Строгое равенство
expect(value).toEqual({id: 1})           # Глубокое равенство
expect(value).toBeTruthy()               # Истинное значение
expect(value).toBeFalsy()                # Ложное значение
expect(value).toBeNull()                 # null
expect(value).toBeUndefined()            # undefined
```

### Строки
```javascript
expect('hello world').toMatch(/world/)    # Регулярное выражение
expect('hello world').toContain('world')  # Содержит подстроку
```

### Массивы
```javascript
expect(['a', 'b', 'c']).toContain('b')        # Содержит элемент
expect(['a', 'b']).toHaveLength(2)            # Длина массива
```

### DOM Testing Library
```javascript
expect(element).toBeInTheDocument()       # Элемент в DOM
expect(element).toHaveClass('active')     # Есть CSS класс
expect(element).toHaveAttribute('id')     # Есть атрибут
expect(input).toHaveValue('text')         # Значение input
expect(button).toBeDisabled()             # Кнопка отключена
```

## Styled Components паттерны

### Базовые стили
```javascript
const Button = styled.button`
  color: blue;
  padding: 10px;
`
```

### Условные стили
```javascript
const Button = styled.button`
  color: ${props => props.primary ? 'white' : 'black'};
`
```

### Расширение стилей
```javascript
const PrimaryButton = styled(Button)`
  background: blue;
`
```

## Redux паттерны

### Использование в компоненте
```javascript
// Получение данных
const data = useSelector(state => state.feature.data)

// Отправка actions
const dispatch = useDispatch()
dispatch(actionCreator(payload))
```

### Создание селекторов
```javascript
const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price, 0)
```

## Полезные сокращения терминала

### macOS
```bash
Cmd+T - Новая вкладка терминала
Cmd+W - Закрыть вкладку
Cmd+K - Очистить экран
Ctrl+C - Прервать выполнение
Ctrl+L - Очистить экран
```

### Навигация
```bash
cd ~         # Домашняя папка
cd ..        # Папка выше
ls -la       # Показать все файлы
pwd          # Текущий путь
```

## Решение проблем

### EMFILE ошибка на macOS
```bash
ulimit -n 65536
```

### Очистка кэша npm
```bash
npm cache clean --force
```

### Переустановка node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

### Проверка портов
```bash
lsof -ti:3000        # Кто использует порт 3000
kill -9 <PID>        # Убить процесс
``` 