import React, {
} from 'react';
import {
  Button,
  Card, InputNumber, Select, Statistic,
} from 'antd';
import { DoubleRightOutlined, SwapOutlined } from '@ant-design/icons';
import './Convertor.css';
import useConvertor from './useConvertor';

function Convertor() {
  const {
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
  } = useConvertor();

  return (
    <Card className="cardStyle" bodyStyle={{ overflow: 'auto' }}>
      {contextHolder}
      <InputNumber
        defaultValue={currencyValue}
        onChange={(value) => {
          setCurrencyValue(value);
        }}
        value={currencyValue}
        className="inputStyle"
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
          onChange={(value) => {
            setFirstSelect(value);
          }}
          options={firstSelectOption}
          className="selectStyle"
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
          onChange={(value) => {
            setSecondSelect(value);
          }}
          options={secondSelectOption}
          className="selectStyle"
        />
      </div>
      <div
        className="outputData"
      >
        <Statistic title={firstSelect} value={currencyValue} />
        <DoubleRightOutlined
          className="iconStyle"
        />
        <Statistic title={secondSelect} value={currencyValue ? outputCurrency[secondSelect] : 0} valueStyle={{ color: '#cf1322' }} />
      </div>
    </Card>
  );
}

export default Convertor;
