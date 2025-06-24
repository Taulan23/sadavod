import filterReducer, { filterActions } from '../store/filterSlice';

describe('Тесты filterSlice', () => {
  const initialState = {
    brands: [],
    categories: [],
    sort: 'default',
  };

  test('должен вернуть начальное состояние', () => {
    expect(filterReducer(undefined, {})).toEqual(initialState);
  });

  test('должен выбрать бренд', () => {
    const action = filterActions.selectBrand('Nike');
    const result = filterReducer(initialState, action);
    
    expect(result.brands).toContain('Nike');
  });

  test('должен отменить выбор бренда', () => {
    const stateWithBrand = {
      ...initialState,
      brands: ['Nike', 'Adidas'],
    };
    
    const action = filterActions.deselectBrand('Nike');
    const result = filterReducer(stateWithBrand, action);
    
    expect(result.brands).not.toContain('Nike');
    expect(result.brands).toContain('Adidas');
  });

  test('должен выбрать категорию', () => {
    const action = filterActions.selectCategory('Shoes');
    const result = filterReducer(initialState, action);
    
    expect(result.categories).toContain('Shoes');
  });

  test('должен установить сортировку', () => {
    const action = filterActions.chooseSort('price-low-high');
    const result = filterReducer(initialState, action);
    
    expect(result.sort).toBe('price-low-high');
  });
}); 