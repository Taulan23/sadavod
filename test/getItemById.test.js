// Mock data.json перед импортом
jest.mock('../pages/api/data.json', () => ({
  items: [
    { id: '1', name: 'Item 1', price: 100 },
    { id: '2', name: 'Item 2', price: 200 },
    { id: '3', name: 'Item 3', price: 300 },
  ]
}), { virtual: true });

import getItemById from '../utils/getItemById';

describe('Тесты getItemById', () => {
  test('должен найти товар по ID', () => {
    const result = getItemById('2');
    expect(result).toEqual({ id: '2', name: 'Item 2', price: 200 });
  });

  test('должен вернуть undefined для несуществующего ID', () => {
    const result = getItemById('999');
    expect(result).toBeUndefined();
  });
}); 