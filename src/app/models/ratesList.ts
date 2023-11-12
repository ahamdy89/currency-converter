export default interface RatesList {
    success: boolean,
    timestamp?: number,
    base?: string,
    date?: string,
    rates: {
        [currencyCode: string]: number;
    } | null
  }