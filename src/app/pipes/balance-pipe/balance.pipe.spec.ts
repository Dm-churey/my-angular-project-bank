import { TestBed } from '@angular/core/testing';
import { BalancePipe } from './balance.pipe';
import { CurrencyPipe } from '@angular/common';

describe('BalancePipe', () => {
  let pipe: BalancePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe]
    });
    pipe = new BalancePipe(TestBed.inject(CurrencyPipe));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform method', () => {
    it('should format balance with USD symbol', () => {
      const result = pipe.transform(1000, 840);
      expect(result).toContain('$');
      expect(result).toContain('1,000');
    });

    it('should format balance with EUR symbol', () => {
      const result = pipe.transform(500, 978);
      expect(result).toContain('€');
      expect(result).toContain('500');
    });

    it('should format balance with RUB symbol', () => {
      const result = pipe.transform(2000, 643);
      expect(result).toContain('₽');
      expect(result).toContain('2,000');
    });

    it('should format balance with CNY symbol', () => {
      const result = pipe.transform(3000, 156);
      expect(result).toContain('¥');
      expect(result).toContain('3,000');
    });

    it('should return "Unknown" for unsupported currency code', () => {
      const result = pipe.transform(1000, 999); // Non-existent currency code
      expect(result).toContain('Unknown');
    });

    it('should handle zero balance correctly', () => {
      const result = pipe.transform(0, 840);
      expect(result).toContain('$');
      expect(result).toContain('0');
    });

    it('should handle negative balance correctly', () => {
      const result = pipe.transform(-500, 978);
      expect(result).toContain('-€500.00');
    });
  });

});
