import { render, screen } from '@testing-library/react';
import ItemCard from '../components/ItemCard';

// Моки будут загружены из jest.setup.js

describe('Тесты ItemCard', () => {
  const defaultProps = {
    id: '1',
    imageURL: '/test-image.jpg',
    brand: 'Test Brand',
    name: 'Test Product',
    amount: 5000,
    setPriority: false,
  };

  test('должен отрендериться с корректными данными', () => {
    render(<ItemCard {...defaultProps} />);
    
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Рублей. 5,000')).toBeInTheDocument();
  });

  test('должен содержать изображение товара', () => {
    render(<ItemCard {...defaultProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  test('должен содержать ссылку на страницу товара', () => {
    render(<ItemCard {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/collections/1');
  });
}); 