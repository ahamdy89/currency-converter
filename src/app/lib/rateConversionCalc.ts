import { CurrenciesList, RatesList } from "../models";

const calculateRate = (fromCurrency: string, toCurrency: string, rates:RatesList["rates"], currencies: CurrenciesList["symbols"], amount: number) => {
    let result:number = 0;

    const conversionFromRate = rates?.[fromCurrency];
    const conversionToRate = rates?.[toCurrency!];

    if (conversionFromRate !== undefined && conversionToRate !== undefined) {
        const convertedCurrency =  ((conversionToRate / conversionFromRate) * amount)
        result = parseFloat(convertedCurrency.toFixed(3))
    } 

    return result;
}

export default calculateRate;