import axios from 'axios';

const cryptoURL: string = 'https://api.coinconvert.net/convert';

export enum Currency {
  USDT = 'USDT',
  BTC = 'BTC',
  ETH = 'ETH',
}

export const api = {
  getConvertedValue:
      (inputCurrency: Currency, outputCurrency: Currency, amount: number | string) => axios
        .get(`${cryptoURL}/${inputCurrency}/${outputCurrency}?amount=${amount}`),
};
