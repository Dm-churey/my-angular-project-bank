import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

type CurrencySymbolMap = {
  840: string;
  978: string;
  643: string;
};

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(balance: number, currencyCode: number): string {
    const currencySymbol = this.getCurrencySymbol(currencyCode);
    return `${this.currencyPipe.transform(balance, currencySymbol, 'symbol-narrow')}`;
  }

  private getCurrencySymbol(currencyCode: number): string {
    const currencySymbols: CurrencySymbolMap = {
      840: 'USD', 
      978: 'EUR',
      643: 'RUB',
    };
    return currencySymbols[currencyCode as keyof CurrencySymbolMap] || 'Unknown';
  }

}
