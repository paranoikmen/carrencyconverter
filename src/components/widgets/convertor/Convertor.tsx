import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card, InputNumber, message, Select, Statistic,
} from 'antd';
import { DoubleRightOutlined, SwapOutlined } from '@ant-design/icons';
import { api, Currency } from '../../../api/api';
import './Convertor.css';

function Convertor() {
  const [messageApi, contextHolder] = message.useMessage();
  const [currencyValue, setCurrencyValue] = useState(0);
  const [firstSelect, setFirstSelect] = useState(Currency.BTC);
  const [secondSelect, setSecondSelect] = useState(Currency.USDT);
  const [outputCurrency, setOutputCurrency] = useState('0');

  const currenciesSelect = useRef([
    { value: Currency.BTC, label: Currency.BTC },
    { value: Currency.USDT, label: Currency.USDT },
    { value: Currency.ETH, label: Currency.ETH },
  ]);

  useEffect(() => {
    if (currencyValue && currencyValue !== 0) {
      api.convert(firstSelect, secondSelect, currencyValue)
        .then((res) => setOutputCurrency(res.data))
        .catch(() => messageApi.info('Something went wrong, try again'));
    }
  }, [currencyValue, firstSelect, secondSelect]);

  const formatterNumber = (val) => {
    if (!val) return 0;
    return val;
  };

  const parserNumber = (val) => {
    if (!val) return 0;
    return val;
  };

  return (
    <Card style={{ width: 500 }}>
      {contextHolder}
      <InputNumber
        defaultValue={currencyValue}
        onChange={(value) => {
          setCurrencyValue(value);
        }}
        value={currencyValue}
        className="marginElement"
        prefix={firstSelect}
        min={0}
        controls={false}
        formatter={(value) => formatterNumber(value)}
        parser={(value) => parserNumber(value)}
      />
      <div>
        <Select
          defaultValue={firstSelect}
          value={firstSelect}
          style={{ width: 120 }}
          onChange={(value) => {
            setFirstSelect(value);
          }}
          options={currenciesSelect.current.map((currencyItem) => ({
            ...currencyItem,
            ...(currencyItem.value === secondSelect && { disabled: true }),
          }))}
          className="marginElement"
        />
        <Button
          icon={<SwapOutlined />}
          onClick={() => {
            const tmpCurrency = secondSelect;
            setSecondSelect(firstSelect);
            setFirstSelect(tmpCurrency);
          }}
        />
        <Select
          defaultValue={secondSelect}
          value={secondSelect}
          style={{ width: 120 }}
          onChange={(value) => {
            setSecondSelect(value);
          }}
          options={currenciesSelect.current.map((currencyItem) => ({
            ...currencyItem,
            ...(currencyItem.value === firstSelect && { disabled: true }),
          }))}
          className="marginElement"
        />
      </div>
      <div
        className="outputData"
      >
        <Statistic title={firstSelect} value={currencyValue} />
        <DoubleRightOutlined
          style={{ fontSize: '30px' }}
          className="marginElement"
        />
        <Statistic title={secondSelect} value={currencyValue ? outputCurrency[secondSelect] : 0} valueStyle={{ color: '#cf1322' }} />
      </div>
    </Card>
  );
}

export default Convertor;
