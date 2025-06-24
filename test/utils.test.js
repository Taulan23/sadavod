import { validateEmail, validatePassword } from '../utils/formValidation';
import { getFormattedCurrency } from '../utils/getFormattedCurrency';

describe('Тесты утилит', () => {
  describe('validateEmail', () => {
    test('должен вернуть true для корректного email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.org')).toBe(true);
    });

    test('должен вернуть false для некорректного email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('должен вернуть true для пароля длиной 6+ символов', () => {
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('password123')).toBe(true);
    });

    test('должен вернуть false для пароля короче 6 символов', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('getFormattedCurrency', () => {
    test('должен форматировать число в валюту', () => {
      expect(getFormattedCurrency(1000)).toBe('1,000');
      expect(getFormattedCurrency(5000)).toBe('5,000');
      expect(getFormattedCurrency(100)).toBe('100');
    });
  });
}); 