import { message } from 'antd';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { api, Currency } from '../../api';

const useConvertor = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [currencyValue, setCurrencyValue] = useState(0);
  const [firstSelect, setFirstSelect] = useState(Currency.BTC);
  const [secondSelect, setSecondSelect] = useState(Currency.USDT);
  const [outputCurrency, setOutputCurrency] = useState('0');

  useEffect(() => {
    if (currencyValue && currencyValue !== 0) {
      api.getConvertedValue(firstSelect, secondSelect, currencyValue)
        .then((res) => setOutputCurrency(res.data))
        .catch(() => messageApi.info('Something went wrong, try again'));
    }
  }, [currencyValue, firstSelect, secondSelect]);

  const currenciesSelect = useRef([
    { value: Currency.BTC, label: Currency.BTC },
    { value: Currency.USDT, label: Currency.USDT },
    { value: Currency.ETH, label: Currency.ETH },
  ]);

  const formatterNumber = (val) => {
    if (!val) return 0;
    return val;
  };

  const parserNumber = (val) => {
    if (!val) return 0;
    return val;
  };

  const firstSelectOption = useMemo(() => currenciesSelect.current.map((currencyItem) => ({
    ...currencyItem,
    ...(currencyItem.value === secondSelect && { disabled: true }),
  })), [secondSelect, currenciesSelect]);

  const secondSelectOption = useMemo(() => currenciesSelect.current.map((currencyItem) => ({
    ...currencyItem,
    ...(currencyItem.value === firstSelect && { disabled: true }),
  })), [firstSelect, currenciesSelect]);

  return {
    contextHolder,
    currencyValue,
    setCurrencyValue,
    firstSelect,
    setFirstSelect,
    secondSelect,
    setSecondSelect,
    outputCurrency,
    formatterNumber,
    parserNumber,
    firstSelectOption,
    secondSelectOption,
  };
};

export default useConvertor;
