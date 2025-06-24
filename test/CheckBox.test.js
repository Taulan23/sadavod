import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CheckBox from '../components/CheckBox';
import filterReducer from '../store/filterSlice';

// Моки будут загружены из jest.setup.js

// Mock icons
jest.mock('../assets/icons', () => ({
  CheckIcon: () => <div>Check</div>,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      filter: filterReducer,
    },
    preloadedState: {
      filter: {
        brands: [],
        categories: [],
        ...initialState.filter,
      },
    },
  });
};

const renderWithProvider = (component, store) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Тесты CheckBox', () => {
  test('должен отрендериться как некликнутый', () => {
    const store = createMockStore();
    renderWithProvider(<CheckBox of="Nike" type="brand" />, store);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('checked');
  });

  test('должен показать состояние checked для выбранного бренда', () => {
    const store = createMockStore({
      filter: { brands: ['Nike'], categories: [] },
    });
    renderWithProvider(<CheckBox of="Nike" type="brand" />, store);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('checked');
  });

  test('должен обработать клик по фильтру', () => {
    const store = createMockStore();
    renderWithProvider(<CheckBox of="Nike" type="brand" />, store);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const state = store.getState();
    expect(state.filter.brands).toContain('Nike');
  });
}); 