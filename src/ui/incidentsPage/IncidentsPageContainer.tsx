import moment from 'moment';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import api, { IGetIncidentsInput, IGetIncidentsResponseResult } from '../../api/api';
import { IFiltersState } from './dataTypes';
import IncidentsPage from './IncidentsPage';

interface IIncidentsPageContainerState {
  isError: boolean;
  isLoading: boolean;
  incidentsData: IGetIncidentsResponseResult | null;
}

export default class IncidentsPageContainer
  extends React.PureComponent<RouteComponentProps, IIncidentsPageContainerState> {

  public state = {
    isError: false,
    isLoading: false,
    incidentsData: null,
  };

  public componentDidMount(): void {
    this.fetchData();
  }

  public componentDidUpdate(prevProps: RouteComponentProps): void {
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchData();
    }
  }

  public render() {
    const { location } = this.props;
    const { isError, isLoading, incidentsData } = this.state;

    const filterParams = getRequestParamsFromQueryString(location.search);
    const filtersState: IFiltersState = {
      dateFrom: filterParams.dateFrom ? moment(filterParams.dateFrom * 1000) : null,
      dateTo: filterParams.dateTo ? moment(filterParams.dateTo * 1000) : null,
      query: filterParams.query || '',
    };

    return (
      <IncidentsPage
        activePage={filterParams.page}
        defaultFiltersState={filtersState}
        isError={isError}
        isLoading={isLoading}
        pageData={incidentsData}
        onFilterChange={this.onFilterChange}
        onPageChange={this.onPageChange}
      />
    );
  }

  private readonly onFilterChange = (filtersState: IFiltersState) => {
    const { history } = this.props;
    history.push(`/${getQueryStringFromFiltersState(filtersState)}`);
  };

  private readonly onPageChange = (page: number) => {
    const { history, location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', page.toString());
    history.push(`/?${queryParams.toString()}`);
  };

  private fetchData(): void {
    const { location } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return;
    }

    const queryString = location.search;

    this.setState({ isLoading: true });
    api.getIncidents(getRequestParamsFromQueryString(queryString))
      .then((res) => {
        const newQueryString = this.props.location.search;
        if (newQueryString !== queryString) {
          return;
        }

        this.setState({ isLoading: false, isError: false, incidentsData: res })
      })
      .catch(() => {
        const newQueryString = this.props.location.search;
        if (newQueryString !== queryString) {
          return;
        }

        this.setState({ isError: true, isLoading: false })
      });
  }
}

function getQueryStringFromFiltersState(filtersState: IFiltersState): string {
  const dateFromParamValue = filtersState.dateFrom ? filtersState.dateFrom.unix() : undefined;
  const dateToParamValue = filtersState.dateTo ? filtersState.dateTo.unix() : undefined;
  const queryParamValue = filtersState.query;

  const queryParams = new URLSearchParams();
  if (dateFromParamValue) {
    queryParams.set('dateFrom', dateFromParamValue.toString());
  }
  if (dateToParamValue) {
    queryParams.set('dateTo', dateToParamValue.toString());
  }
  if (queryParamValue) {
    queryParams.set('query', queryParamValue);
  }

  const paramsStr = queryParams.toString();

  return !!paramsStr ? `?${paramsStr}` : '';
}

function getRequestParamsFromQueryString(queryString: string): IGetIncidentsInput {
  const queryParams = new URLSearchParams(queryString);
  const pageParamValue = queryParams.get('page');
  const incidentTextQueryParamValue = queryParams.get('query');
  const dateFromParamValue = queryParams.get('dateFrom');
  const dateToParamValue = queryParams.get('dateTo');
  return {
    page: pageParamValue ? Number(pageParamValue) : undefined,
    query: incidentTextQueryParamValue ?
      decodeURIComponent(incidentTextQueryParamValue) :
      undefined,
    dateFrom: dateFromParamValue ? Number(dateFromParamValue) : undefined,
    dateTo: dateToParamValue ? Number(dateToParamValue) : undefined,
  };
}
