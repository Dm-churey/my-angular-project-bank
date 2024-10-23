import { TestBed } from '@angular/core/testing';
import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  let pipe: PhoneNumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberPipe]
    });
    pipe = new PhoneNumberPipe();
  });

  it('should transform phone number correctly', () => {
    const phoneNumber = '(123) 456-78901';
    expect(pipe.transform(phoneNumber)).toBe('+1(234) 567-89-01');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should be processed phone numbers in a valid form', () => {
    const phoneNumber = '+1 (234) 567-8901';
    expect(pipe.transform(phoneNumber)).toBe('+1(234) 567-89-01');
  });

  it('should process telephone numbers consisting only of numbers', () => {
    const phoneNumber = '12345678901';
    expect(pipe.transform(phoneNumber)).toBe('+1(234) 567-89-01');
  });
});
