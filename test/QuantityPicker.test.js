import { render, screen, fireEvent } from '@testing-library/react';
import QuantityPicker from '../components/QuantityPicker';

// Моки будут загружены из jest.setup.js

describe('Тесты QuantityPicker', () => {
  test('должен отобразить кнопки количества', () => {
    const mockOnSetQuantity = jest.fn();
    render(<QuantityPicker currentQuantity="5" onSetQuantity={mockOnSetQuantity} />);
    
    // Проверяем что все кнопки присутствуют
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test('должен выделить активную кнопку', () => {
    const mockOnSetQuantity = jest.fn();
    render(<QuantityPicker currentQuantity="5" onSetQuantity={mockOnSetQuantity} />);
    
    const activeButton = screen.getByText('5');
    expect(activeButton).toHaveClass('active');
  });

  test('должен вызвать onSetQuantity при клике', () => {
    const mockOnSetQuantity = jest.fn();
    render(<QuantityPicker currentQuantity="5" onSetQuantity={mockOnSetQuantity} />);
    
    fireEvent.click(screen.getByText('7'));
    expect(mockOnSetQuantity).toHaveBeenCalledWith('7');
  });
}); 