import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment';
import React from 'react';
import IncidentsPage, { IIncidentsPageProps } from './IncidentsPage';
import Pagination from './pagination/Pagination';

function nop() {}
const testProps: IIncidentsPageProps = {
  activePage: 2,
  appliedFiltersState: {
    query: 'test',
    dateFrom: moment.utc('2019-01-01'),
    dateTo: moment.utc('2019-02-01'),
  },
  pageData: {
    incidents: [
      { id: 1, title: 'Test title 1',
        description: 'Detailed test description 1',
        address: 'Test address 1',
        occurred_at: Date.UTC(2019, 0, 1),
        updated_at: Date.UTC(2019, 1, 1),
        source: {
          html_url: 'https://test.com/bike/1',
        },
        media: {
          image_url_thumb: 'https://test.com/bike/1/photo.jpg',
        },
      },
    ],
    total: 11,
  },
  isError: false,
  isLoading: false,
  isFirstLoadDone: true,
  onFilterLoadData: nop,
  onPageChange: nop,
};

it('renders correctly with results', () => {
  const wrapper = shallow(
    <IncidentsPage {...testProps}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders correctly during the first loading', () => {
  const filtersState = {
    query: '',
    dateFrom: null,
    dateTo: null,
  };
  const wrapper = shallow(
    <IncidentsPage
      activePage={undefined}
      appliedFiltersState={filtersState}
      pageData={null}
      isError={false}
      isLoading={true}
      isFirstLoadDone={false}
      onFilterLoadData={nop}
      onPageChange={nop}
    />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders correctly during next loadings', () => {
  const wrapper = shallow(
    <IncidentsPage {...testProps} isLoading={true}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders correctly if active page is not defined', () => {
  const wrapper = mount(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <IncidentsPage {...testProps} activePage={undefined}/>
    </MuiPickersUtilsProvider>
  );

  const pagination = wrapper.find(Pagination);
  expect(pagination).toHaveLength(1);
  expect(pagination.props().activePage).toBe(1);
});

it('shows error message on error', () => {
  const wrapper = shallow(
    <IncidentsPage {...testProps} isError={true}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('shows "no results" message if incidents data is empty', () => {
  const pageData = { incidents: [], total: 0 };
  const wrapper = shallow(
    <IncidentsPage {...testProps} pageData={pageData}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
