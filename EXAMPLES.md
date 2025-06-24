# Примеры кода и использования

Этот файл содержит практические примеры использования технологий в проекте Sadavod.

## Redux Slice примеры

### Создание slice

```javascript
// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",                    // Имя slice - будет префиксом для actions
  initialState: {                  // Начальное состояние
    items: [],
  },
  reducers: {                      // Редьюсеры - функции изменения состояния
    setItems(state, action) {      // Принимают state и action
      state.items = action.payload;
    },
    addItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.itemId === action.payload.itemId
      );
      
      if (existingItem) {
        existingItem.itemQuantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.itemId !== action.payload.itemId
      );
    },
  },
});

// Экспорт actions (автоматически созданы на основе имен редьюсеров)
export const cartActions = cartSlice.actions;

// Экспорт редьюсера
export default cartSlice.reducer;
```

### Использование в компоненте

```javascript
// components/Cart.js
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';

const Cart = () => {
  // Получение данных из store
  const cartItems = useSelector(state => state.cart.items);
  
  // Получение функции dispatch для отправки actions
  const dispatch = useDispatch();
  
  const addToCart = (item) => {
    // Отправка action
    dispatch(cartActions.addItem({
      itemId: item.id,
      itemName: item.name,
      itemQuantity: 1
    }));
  };
  
  const removeFromCart = (itemId) => {
    dispatch(cartActions.removeItem({ itemId }));
  };
  
  return (
    <div>
      {cartItems.map(item => (
        <div key={item.itemId}>
          <span>{item.itemName}</span>
          <button onClick={() => removeFromCart(item.itemId)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};
```

## Styled Components примеры

### Базовая стилизация

```javascript
// components/Button.js
import styled from 'styled-components';

// Создание стилизованного компонента
const StyledButton = styled.button`
  background-color: #4a00e0;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #3700b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Использование
const Button = ({ children, onClick, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
```

### Стилизация с пропсами

```javascript
// components/Card.js
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  /* Условная стилизация на основе пропсов */
  ${props => props.featured && `
    border: 2px solid #4a00e0;
    box-shadow: 0 4px 8px rgba(74, 0, 224, 0.2);
  `}
  
  ${props => props.size === 'large' && `
    padding: 24px;
    font-size: 18px;
  `}
`;

// Использование
<Card featured size="large">
  <h3>Заголовок</h3>
  <p>Содержимое карточки</p>
</Card>
```

## Тестирование примеры

### Тестирование компонента

```javascript
// test/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button компонент', () => {
  test('рендерится с текстом', () => {
    render(<Button>Нажми меня</Button>);
    
    expect(screen.getByText('Нажми меня')).toBeInTheDocument();
  });
  
  test('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Кнопка</Button>);
    
    fireEvent.click(screen.getByText('Кнопка'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('отключается при disabled=true', () => {
    render(<Button disabled>Кнопка</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

### Тестирование Redux slice

```javascript
// test/cartSlice.test.js
import cartReducer, { cartActions } from '../store/cartSlice';

describe('cartSlice', () => {
  const initialState = {
    items: [],
  };
  
  test('должен добавить товар в корзину', () => {
    const newItem = { itemId: '1', itemName: 'Товар', itemQuantity: 1 };
    
    const action = cartActions.addItem(newItem);
    const result = cartReducer(initialState, action);
    
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toEqual(newItem);
  });
  
  test('должен увеличить количество существующего товара', () => {
    const stateWithItem = {
      items: [{ itemId: '1', itemName: 'Товар', itemQuantity: 1 }]
    };
    
    const action = cartActions.addItem({ itemId: '1', itemQuantity: 1 });
    const result = cartReducer(stateWithItem, action);
    
    expect(result.items[0].itemQuantity).toBe(2);
  });
});
```

### Тестирование компонента с Redux

```javascript
// test/Cart.test.js
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from '../components/Cart';
import cartReducer from '../store/cartSlice';

// Создание mock store для тестов
const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });
};

// Вспомогательная функция для рендеринга с Provider
const renderWithProvider = (component, store) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('Cart компонент', () => {
  test('отображает товары из корзины', () => {
    const mockState = {
      cart: {
        items: [
          { itemId: '1', itemName: 'Товар 1', itemQuantity: 2 },
          { itemId: '2', itemName: 'Товар 2', itemQuantity: 1 },
        ]
      }
    };
    
    const store = createMockStore(mockState);
    renderWithProvider(<Cart />, store);
    
    expect(screen.getByText('Товар 1')).toBeInTheDocument();
    expect(screen.getByText('Товар 2')).toBeInTheDocument();
  });
  
  test('показывает пустую корзину', () => {
    const store = createMockStore({ cart: { items: [] } });
    renderWithProvider(<Cart />, store);
    
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });
});
```

## Next.js примеры

### Страница с getStaticProps

```javascript
// pages/products.js
import { getItems } from '../utils/getItems';

// Компонент страницы
const ProductsPage = ({ products }) => {
  return (
    <div>
      <h1>Товары</h1>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

// Функция для получения данных на этапе сборки
export async function getStaticProps() {
  const products = await getItems();
  
  return {
    props: {
      products,
    },
    revalidate: 3600, // Обновлять каждый час
  };
}

export default ProductsPage;
```

### API Route

```javascript
// pages/api/products.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Получение товаров
    const products = getProductsFromDatabase();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    // Создание товара
    const newProduct = req.body;
    const savedProduct = saveProductToDatabase(newProduct);
    res.status(201).json(savedProduct);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

## Утилиты и хелперы

### Валидация форм

```javascript
// utils/formValidation.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateForm = (formData) => {
  const errors = {};
  
  if (!validateEmail(formData.email)) {
    errors.email = 'Некорректный email';
  }
  
  if (!validatePassword(formData.password)) {
    errors.password = 'Пароль должен быть не менее 6 символов';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
```

### Форматирование данных

```javascript
// utils/formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};
```

## Хуки (Hooks)

### Кастомный хук для API запросов

```javascript
// hooks/useApi.js
import { useState, useEffect } from 'react';

export const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
};

// Использование
const ProductList = () => {
  const { data: products, loading, error } = useApi('/api/products');
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

Эти примеры показывают практическое применение всех основных технологий, используемых в проекте! 