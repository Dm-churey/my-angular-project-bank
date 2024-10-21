export type CurrencySymbol = '840' | '978' | '643' | '156';

export interface CurrencySymbolMap extends Record<CurrencySymbol, string> {}

export const CURRENCY_SYMBOL_MAP: CurrencySymbolMap = {
  840: 'USD',
  978: 'EUR',
  643: 'RUB',
  156: 'CNY',
} as const;