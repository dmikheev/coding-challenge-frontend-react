import { cleanup, fireEvent, render } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Pagination from './Pagination';

function nop () {}

afterEach(cleanup);

it('renders correctly', () => {
  const wrapper = shallow(
    <Pagination activePage={5} itemsCountPerPage={10} totalItemsCount={100} onChange={nop}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders correctly when totalPages < 5', () => {
  const wrapper = shallow(
    <Pagination activePage={1} itemsCountPerPage={10} totalItemsCount={30} onChange={nop}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders correctly when activePage = 1', () => {
  const wrapper = shallow(
    <Pagination activePage={1} itemsCountPerPage={10} totalItemsCount={100} onChange={nop}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders correctly when activePage is the last page', () => {
  const wrapper = shallow(
    <Pagination activePage={10} itemsCountPerPage={10} totalItemsCount={100} onChange={nop}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('calls onChange with the right page number on a number button click', () => {
  const onChange = jest.fn();
  const { queryByText } = render(
    <Pagination activePage={5} itemsCountPerPage={10} totalItemsCount={100} onChange={onChange}/>
  );

  const firstButton = queryByText('7');
  expect(firstButton).toBeTruthy();
  fireEvent.click(firstButton!);

  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(7);
});

it('calls onChange with 1 on the "First" button click', () => {
  const onChange = jest.fn();
  const { queryByText } = render(
    <Pagination activePage={5} itemsCountPerPage={10} totalItemsCount={100} onChange={onChange}/>
  );

  const firstButton = queryByText('<< First');
  expect(firstButton).toBeTruthy();
  fireEvent.click(firstButton!);

  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(1);
});

it('calls onChange with prev page on the "Prev" button click', () => {
  const activePage = 5;
  const onChange = jest.fn();
  const { queryByText } = render(
    <Pagination activePage={activePage} itemsCountPerPage={10} totalItemsCount={100} onChange={onChange}/>
  );

  const firstButton = queryByText('< Prev');
  expect(firstButton).toBeTruthy();
  fireEvent.click(firstButton!);

  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(activePage - 1);
});

it('calls onChange with next page on the "Next" button click', () => {
  const activePage = 5;
  const onChange = jest.fn();
  const { queryByText } = render(
    <Pagination activePage={activePage} itemsCountPerPage={10} totalItemsCount={100} onChange={onChange}/>
  );

  const firstButton = queryByText('Next >');
  expect(firstButton).toBeTruthy();
  fireEvent.click(firstButton!);

  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(activePage + 1);
});

it('calls onChange with the last page on the "Last" button click', () => {
  const onChange = jest.fn();
  const { queryByText } = render(
    <Pagination activePage={5} itemsCountPerPage={10} totalItemsCount={100} onChange={onChange}/>
  );

  const firstButton = queryByText('Last >>');
  expect(firstButton).toBeTruthy();
  fireEvent.click(firstButton!);

  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(10);
});
