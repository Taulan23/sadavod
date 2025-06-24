import { render, screen } from '@testing-library/react';
import BetterLink from '../components/BetterLink';

describe('Тесты BetterLink', () => {
  test('должен отрендерить ссылку с правильным href', () => {
    render(
      <BetterLink href="/test-page">
        <span>Test Link</span>
      </BetterLink>
    );
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-page');
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });
}); 