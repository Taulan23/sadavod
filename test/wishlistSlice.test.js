import wishlistReducer, { wishlistActions } from '../store/wishlistSlice';

describe('Тесты wishlistSlice', () => {
  const initialState = {
    items: [],
  };

  test('должен вернуть начальное состояние', () => {
    expect(wishlistReducer(undefined, {})).toEqual(initialState);
  });

  test('должен установить товары в список желаний', () => {
    const items = ['item1', 'item2'];
    const action = wishlistActions.setItems(items);
    const result = wishlistReducer(initialState, action);
    
    expect(result.items).toEqual(items);
  });

  test('должен заменить все товары в списке желаний', () => {
    const existingState = {
      items: ['item1'],
    };
    
    const newItems = ['item2', 'item3'];
    const action = wishlistActions.setItems(newItems);
    const result = wishlistReducer(existingState, action);
    
    expect(result.items).toEqual(newItems);
    expect(result.items).toHaveLength(2);
  });
}); 