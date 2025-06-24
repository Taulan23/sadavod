import cartReducer, { cartActions } from '../store/cartSlice';

describe('Тесты cartSlice', () => {
  const initialState = {
    items: [],
  };

  test('должен вернуть начальное состояние', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  test('должен установить товары в корзину', () => {
    const items = [
      { itemId: '1', itemSize: 'M', itemQuantity: '2' },
      { itemId: '2', itemSize: 'L', itemQuantity: '1' },
    ];
    
    const action = cartActions.setItems(items);
    const result = cartReducer(initialState, action);
    
    expect(result.items).toEqual(items);
  });

  test('должен добавить новый товар в корзину', () => {
    const newItem = { itemId: '1', itemSize: 'M', itemQuantity: '1' };
    
    const action = cartActions.addItem(newItem);
    const result = cartReducer(initialState, action);
    
    expect(result.items).toContainEqual(newItem);
    expect(result.items).toHaveLength(1);
  });

  test('должен увеличить количество существующего товара', () => {
    const existingState = {
      items: [{ itemId: '1', itemSize: 'M', itemQuantity: '1' }],
    };
    
    const action = cartActions.addItem({ itemId: '1', itemSize: 'M', itemQuantity: '1' });
    const result = cartReducer(existingState, action);
    
    expect(result.items[0].itemQuantity).toBe('2');
  });

  test('должен удалить товар из корзины', () => {
    const existingState = {
      items: [
        { itemId: '1', itemSize: 'M', itemQuantity: '1' },
        { itemId: '2', itemSize: 'L', itemQuantity: '1' },
      ],
    };
    
    const action = cartActions.removeItem({ itemId: '1' });
    const result = cartReducer(existingState, action);
    
    expect(result.items).toHaveLength(1);
    expect(result.items[0].itemId).toBe('2');
  });
}); 