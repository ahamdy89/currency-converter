export default interface CurrenciesList {
    success?: boolean;
    symbols: {
      [currencyCode: string]: string;
    } | null;
  }