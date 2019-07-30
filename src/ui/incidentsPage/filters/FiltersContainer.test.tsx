import { shallow } from 'enzyme';
import moment from 'moment';
import React, { ChangeEvent } from 'react';
import { IFilterComponentState } from '../dataTypes';
import Filters from './Filters';
import FiltersContainer from './FiltersContainer';

const nop = () => {};

it('propagates initial filters state', () => {
  const filtersState: IFilterComponentState = {
    query: 'test1',
    dateFrom: moment('2019-07-01'),
    dateTo: moment('2019-07-30'),
  };
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={filtersState} onLoadData={nop}/>
  );

  const filtersComponent = wrapper.find(Filters);
  expect(filtersComponent).toHaveLength(1);
  expect(filtersComponent.props().filtersState).toBe(filtersState);
});

it('calls onLoadData with initial state on button click if nothing was changed', () => {
  const filtersState: IFilterComponentState = {
    query: 'test1',
    dateFrom: moment('2019-07-01'),
    dateTo: moment('2019-07-30'),
  };
  const onLoadData = jest.fn();
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={filtersState} onLoadData={onLoadData}/>
  );

  const filtersComponent = wrapper.find(Filters);
  expect(filtersComponent).toHaveLength(1);
  expect(filtersComponent.props().onSearchButtonClick).toBeTruthy();

  filtersComponent.props().onSearchButtonClick();
  expect(onLoadData).toBeCalledTimes(1);
  expect(onLoadData.mock.calls[0][0]).toStrictEqual(filtersState);
});

it('calls onLoadData with correct state on button click after query change', () => {
  const initialState: IFilterComponentState = {
    query: 'test1',
    dateFrom: moment('2019-07-01'),
    dateTo: moment('2019-07-30'),
  };
  const resultState: IFilterComponentState = {
    ...initialState,
    query: 'result1',
  };
  const onLoadData = jest.fn();
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={initialState} onLoadData={onLoadData}/>
  );

  const filtersComponent1 = wrapper.find(Filters);
  filtersComponent1.props()
    .onQueryChange({ target: { value: resultState.query } } as ChangeEvent<HTMLInputElement>);

  const filtersComponent2 = wrapper.find(Filters);
  filtersComponent2.props().onSearchButtonClick();

  expect(onLoadData).toBeCalledTimes(1);
  expect(onLoadData.mock.calls[0][0]).toStrictEqual(resultState);
});

it('calls onLoadData with correct state on button click after dateFrom change', () => {
  const initialState: IFilterComponentState = {
    query: 'test1',
    dateFrom: moment('2019-07-01'),
    dateTo: moment('2019-07-30'),
  };
  const resultState: IFilterComponentState = {
    ...initialState,
    dateFrom: moment('2018-01-01'),
  };
  const onLoadData = jest.fn();
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={initialState} onLoadData={onLoadData}/>
  );

  const filtersComponent1 = wrapper.find(Filters);
  filtersComponent1.props().onDateFromChange(resultState.dateFrom);

  const filtersComponent2 = wrapper.find(Filters);
  filtersComponent2.props().onSearchButtonClick();

  expect(onLoadData).toBeCalledTimes(1);
  expect(onLoadData.mock.calls[0][0]).toStrictEqual(resultState);
});

it('calls onLoadData with correct state on button click after dateTo change', () => {
  const initialState: IFilterComponentState = {
    query: 'test1',
    dateFrom: moment('2019-02-01'),
    dateTo: moment('2019-07-30'),
  };
  const resultState: IFilterComponentState = {
    ...initialState,
    dateTo: moment('2019-06-15'),
  };
  const onLoadData = jest.fn();
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={initialState} onLoadData={onLoadData}/>
  );

  const filtersComponent1 = wrapper.find(Filters);
  filtersComponent1.props().onDateToChange(resultState.dateTo);

  const filtersComponent2 = wrapper.find(Filters);
  filtersComponent2.props().onSearchButtonClick();

  expect(onLoadData).toBeCalledTimes(1);
  expect(onLoadData.mock.calls[0][0]).toStrictEqual(resultState);
});

it('doesn\'t call onLoadData on inputs enter press if filter state didn\'t change', () => {
  const initialState: IFilterComponentState = {
    query: 'test1',
    dateFrom: moment('2019-07-01'),
    dateTo: moment('2019-07-30'),
  };
  const onLoadData = jest.fn();
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={initialState} onLoadData={onLoadData}/>
  );

  const filtersComponent = wrapper.find(Filters);
  filtersComponent.props().onInputEnterPress();
  expect(onLoadData).toBeCalledTimes(0);
});

it('calls onLoadData on inputs enter press if filters state changed', () => {
  const initialState: IFilterComponentState = {
    query: 'test1',
    dateFrom: null,
    dateTo: moment('2019-07-30'),
  };
  const resultState1: IFilterComponentState = {
    ...initialState,
    dateFrom: moment('2019-02-01'),
  };
  const onLoadData = jest.fn();
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={initialState} onLoadData={onLoadData}/>
  );

  const filtersComponent1 = wrapper.find(Filters);
  filtersComponent1.props().onDateFromChange(resultState1.dateFrom);

  const filtersComponent2 = wrapper.find(Filters);
  filtersComponent2.props().onInputEnterPress();
  expect(onLoadData).toBeCalledTimes(1);
  expect(onLoadData.mock.calls[0][0]).toStrictEqual(resultState1);
});

it('doesn\'t call onLoadData on inputs enter press if filters state changed, props state changed and they are equal', () => {
  const initialState: IFilterComponentState = {
    query: 'test1',
    dateFrom: null,
    dateTo: moment('2019-07-30'),
  };
  const resultState1: IFilterComponentState = {
    ...initialState,
    dateFrom: moment('2019-02-01'),
  };
  const onLoadData = jest.fn();
  const wrapper = shallow(
    <FiltersContainer appliedFiltersState={initialState} onLoadData={onLoadData}/>
  );

  const filtersComponent1 = wrapper.find(Filters);
  filtersComponent1.props().onDateFromChange(resultState1.dateFrom);

  wrapper.setProps({ appliedFiltersState: resultState1 });

  const filtersComponent2 = wrapper.find(Filters);
  filtersComponent2.props().onInputEnterPress();
  expect(onLoadData).toBeCalledTimes(0);

  filtersComponent2.props().onDateFromChange(resultState1.dateFrom!.clone());

  const filtersComponent3 = wrapper.find(Filters);
  filtersComponent3.props().onInputEnterPress();
  expect(onLoadData).toBeCalledTimes(0);
});
