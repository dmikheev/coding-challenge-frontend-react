import MomentUtils from '@date-io/moment';
import { Button, OutlinedInput } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mount, shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { KeyValues } from '../../../constants/keyValues';
import { IFilterComponentState } from '../dataTypes';
import Filters, { IFiltersProps } from './Filters';

const nop = () => {};
const testFiltersState: IFilterComponentState = {
  query: 'test',
  dateFrom: moment('2019-07-02'),
  dateTo: moment('2019-07-29'),
};
const testProps: IFiltersProps = {
  filtersState: testFiltersState,
  onQueryChange: nop,
  onDateFromChange: nop,
  onDateToChange: nop,
  onInputEnterPress: nop,
  onSearchButtonClick: nop,
};

it('properly propagates query state', () => {
  const wrapper = shallow(
    <Filters {...testProps}/>
  );

  const queryInput = wrapper.find(OutlinedInput);
  expect(queryInput).toHaveLength(1);
  expect(queryInput.props().value).toBe(testProps.filtersState.query);
});

it('properly propagates dateFrom and dateTo states', () => {
  const wrapper = mount(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Filters {...testProps}/>
    </MuiPickersUtilsProvider>
  );

  const dateFromPicker = wrapper.find({ label: 'Date from' }).find(KeyboardDatePicker);
  expect(dateFromPicker).toHaveLength(1);
  expect(dateFromPicker.props().value).toBe(testProps.filtersState.dateFrom);

  const dateToPicker = wrapper.find({ label: 'Date to' }).find(KeyboardDatePicker);
  expect(dateToPicker).toHaveLength(1);
  expect(dateToPicker.props().value).toBe(testProps.filtersState.dateTo);
});

it('propagates onQueryChange callback', () => {
  const onQueryChange = jest.fn();
  const wrapper = shallow(
    <Filters {...testProps} onQueryChange={onQueryChange}/>
  );

  const queryInput = wrapper.find(OutlinedInput);
  expect(queryInput).toHaveLength(1);
  expect(queryInput.props().onChange).toBe(onQueryChange);
});

it('propagates onDateFromChange callback', () => {
  const onDateFromChange = jest.fn();
  const wrapper = mount(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Filters {...testProps} onDateFromChange={onDateFromChange}/>
    </MuiPickersUtilsProvider>
  );

  const dateFromPicker = wrapper.find({ label: 'Date from' }).find(KeyboardDatePicker);
  expect(dateFromPicker).toHaveLength(1);
  expect(dateFromPicker.props().onChange).toBe(onDateFromChange);
});

it('propagates onDateToChange callback', () => {
  const onDateToChange = jest.fn();
  const wrapper = mount(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Filters {...testProps} onDateToChange={onDateToChange}/>
    </MuiPickersUtilsProvider>
  );

  const dateToPicker = wrapper.find({ label: 'Date to' }).find(KeyboardDatePicker);
  expect(dateToPicker).toHaveLength(1);
  expect(dateToPicker.props().onChange).toBe(onDateToChange);
});

it('propagates onSearchButtonClick callback', () => {
  const onSearchButtonClick = jest.fn();
  const wrapper = shallow(
    <Filters {...testProps} onSearchButtonClick={onSearchButtonClick}/>
  );

  const button = wrapper.find(Button);
  expect(button).toHaveLength(1);
  expect(button.props().onClick).toBe(onSearchButtonClick);
});

it('calls onInputEnterPress and blurs the input on input Enter press', () => {
  const onInputEnterPress = jest.fn();
  const shallowWrapper = shallow(
    <Filters {...testProps} onInputEnterPress={onInputEnterPress}/>
  );

  const queryInput = shallowWrapper.find(OutlinedInput);
  expect(queryInput).toHaveLength(1);
  expect(queryInput.props().onKeyPress).toBeTruthy();

  const queryInputBlurFunc = jest.fn();
  const queryInputKeyPressTarget = { blur: queryInputBlurFunc };

  queryInput.props().onKeyPress!({
    key: KeyValues.DIGIT_1,
    target: queryInputKeyPressTarget,
  } as unknown as React.KeyboardEvent<HTMLInputElement>);
  expect(onInputEnterPress).toBeCalledTimes(0);
  expect(queryInputBlurFunc).toBeCalledTimes(0);

  queryInput.props().onKeyPress!({
    key: KeyValues.ENTER,
    target: queryInputKeyPressTarget,
  } as unknown as React.KeyboardEvent<HTMLInputElement>);
  expect(onInputEnterPress).toBeCalledTimes(1);
  expect(queryInputBlurFunc).toBeCalledTimes(1);

  const mountWrapper = mount(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Filters {...testProps} onInputEnterPress={onInputEnterPress}/>
    </MuiPickersUtilsProvider>
  );

  const dateFromPicker = mountWrapper.find({ label: 'Date from' }).find(KeyboardDatePicker);
  expect(dateFromPicker).toHaveLength(1);
  expect(dateFromPicker.props().onKeyPress).toBeTruthy();

  const dateFromInputBlurFunc = jest.fn();
  const dateFromInputEventTarget = { blur: dateFromInputBlurFunc };

  dateFromPicker.props().onKeyPress!({
    key: KeyValues.DIGIT_1,
    target: dateFromInputEventTarget,
  } as unknown as React.KeyboardEvent<HTMLInputElement>);
  expect(onInputEnterPress).toBeCalledTimes(1);
  expect(dateFromInputBlurFunc).toBeCalledTimes(0);

  dateFromPicker.props().onKeyPress!({
    key: KeyValues.ENTER,
    target: dateFromInputEventTarget,
  } as unknown as React.KeyboardEvent<HTMLInputElement>);
  expect(onInputEnterPress).toBeCalledTimes(2);
  expect(dateFromInputBlurFunc).toBeCalledTimes(1);

  const dateToPicker = mountWrapper.find({ label: 'Date to' }).find(KeyboardDatePicker);
  expect(dateToPicker).toHaveLength(1);
  expect(dateToPicker.props().onKeyPress).toBeTruthy();

  const dateToInputBlurFunc = jest.fn();
  const dateToInputEventTarget = { blur: dateToInputBlurFunc };

  dateFromPicker.props().onKeyPress!({
    key: KeyValues.DIGIT_1,
    target: dateToInputEventTarget,
  } as unknown as React.KeyboardEvent<HTMLInputElement>);
  expect(onInputEnterPress).toBeCalledTimes(2);
  expect(dateToInputBlurFunc).toBeCalledTimes(0);

  dateFromPicker.props().onKeyPress!({
    key: KeyValues.ENTER,
    target: dateToInputEventTarget,
  } as unknown as React.KeyboardEvent<HTMLInputElement>);
  expect(onInputEnterPress).toBeCalledTimes(3);
  expect(dateToInputBlurFunc).toBeCalledTimes(1);
});
