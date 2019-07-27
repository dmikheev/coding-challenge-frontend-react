import moment from 'moment';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import api, { IGetIncidentsInput, IGetIncidentsResponseResult } from '../../api/api';
import { IFiltersState } from './dataTypes';
import IncidentsPage from './IncidentsPage';

interface IIncidentsPageContainerProps extends RouteComponentProps {
  className?: string;
}
interface IIncidentsPageContainerState {
  isError: boolean;
  isLoading: boolean;
  incidentsData: IGetIncidentsResponseResult | null;
}

export default class IncidentsPageContainer
  extends React.PureComponent<IIncidentsPageContainerProps, IIncidentsPageContainerState> {

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
    const { className, location } = this.props;
    const { isError, isLoading, incidentsData } = this.state;

    const filterParams = getRequestParamsFromQueryString(location.search);
    const filtersState: IFiltersState = {
      dateFrom: filterParams.dateFrom ? moment(filterParams.dateFrom) : null,
      dateTo: filterParams.dateTo ? moment(filterParams.dateTo) : null,
      query: filterParams.query || '',
    };

    return (
      <IncidentsPage
        className={className}
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
    const { history, location } = this.props;
    const oldRequestParams = getRequestParamsFromQueryString(location.search);
    const newRequestParams = getRequestParamsFromFiltersState(filtersState);
    if (
      oldRequestParams.query === newRequestParams.query &&
      oldRequestParams.dateFrom === newRequestParams.dateFrom &&
      oldRequestParams.dateTo === newRequestParams.dateTo
    ) {
      return;
    }

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
    const queryString = location.search;

    this.setState({ isLoading: true });
    api.getIncidents(getRequestParamsFromQueryString(queryString))
      .then((res) => {
        const newQueryString = this.props.location.search;
        if (newQueryString !== queryString) {
          return;
        }

        this.setState({ isLoading: false, isError: false, incidentsData: res });
        window.scrollTo(window.scrollX, 0);
      })
      .catch(() => {
        const newQueryString = this.props.location.search;
        if (newQueryString !== queryString) {
          return;
        }

        this.setState({ isError: true, isLoading: false });
      });
  }
}

function getQueryStringFromFiltersState(filtersState: IFiltersState): string {
  const requestParams = getRequestParamsFromFiltersState(filtersState);

  const queryParams = new URLSearchParams();
  if (requestParams.dateFrom) {
    queryParams.set('dateFrom', requestParams.dateFrom.toString());
  }
  if (requestParams.dateTo) {
    queryParams.set('dateTo', requestParams.dateTo.toString());
  }
  if (requestParams.query) {
    queryParams.set('query', requestParams.query);
  }

  const paramsStr = queryParams.toString();
  return !!paramsStr ? `?${paramsStr}` : '';
}

function getRequestParamsFromFiltersState(filtersState: IFiltersState): IGetIncidentsInput {
  return {
    dateFrom: filtersState.dateFrom ? filtersState.dateFrom.valueOf() : undefined,
    dateTo: filtersState.dateTo ? filtersState.dateTo.valueOf() : undefined,
    query: filtersState.query || undefined,
  };
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
