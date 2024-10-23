import { TestBed } from '@angular/core/testing';
import { BirthdatePipe } from './birthdate.pipe';

describe('BirthdatePipe', () => {
  let pipe: BirthdatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [BirthdatePipe] });
    pipe = new BirthdatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform method', () => {
    it('should return empty string for undefined input', () => {
      expect(pipe.transform(undefined)).toBe('');
    });

    it('should format date correctly', () => {
      const testDate = new Date('2024-07-25T00:00:00Z');
      expect(pipe.transform(testDate.toISOString())).toBe('25.07.2024');
    });

    it('should format date with single-digit day/month', () => {
      const testDate = new Date('2024-01-05T00:00:00Z');
      expect(pipe.transform(testDate.toISOString())).toBe('05.01.2024');
    });

    it('should format date with double-digit day/month', () => {
      const testDate = new Date('2024-12-31T00:00:00Z');
      expect(pipe.transform(testDate.toISOString())).toBe('31.12.2024');
    });

    it('should handle different date formats', () => {
      expect(pipe.transform('2024/07/25')).toBe('25.07.2024');
      expect(pipe.transform('2024-07')).toBe('01.07.2024');
      expect(pipe.transform('July 25, 2024')).toBe('25.07.2024');
    });
  });
});
