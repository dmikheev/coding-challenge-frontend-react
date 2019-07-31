import moment from 'moment';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import api, { IGetIncidentsInput, IGetIncidentsResponseResult } from '../../api/api';
import { areObjectsShallowEqual } from '../../utils/shallowEqual';
import { IFilterComponentState, IFiltersState } from './dataTypes';
import IncidentsPage from './IncidentsPage';

export interface IIncidentsPageContainerProps extends RouteComponentProps {
  className?: string;
}
interface IIncidentsPageContainerState {
  appliedFilters: IFiltersState;
  isError: boolean;
  isLoading: boolean;
  isFirstLoadDone: boolean;
  incidentsData: IGetIncidentsResponseResult | null;
}

export default class IncidentsPageContainer
  extends React.PureComponent<IIncidentsPageContainerProps, IIncidentsPageContainerState> {

  constructor(props: IIncidentsPageContainerProps) {
    super(props);

    this.state = {
      appliedFilters: getFiltersStateFromQueryString(props.location.search),
      isError: false,
      isLoading: false,
      isFirstLoadDone: false,
      incidentsData: null,
    };
  }

  public componentDidMount(): void {
    const { appliedFilters } = this.state;
    this.fetchData(appliedFilters);
  }

  public componentDidUpdate(
    prevProps: Readonly<IIncidentsPageContainerProps>,
    prevState: Readonly<IIncidentsPageContainerState>,
    snapshot?: any,
  ): void {
    const { history, location } = this.props;
    const { appliedFilters: newFiltersState } = this.state;

    if (location.search !== prevProps.location.search) {
      const newQueryStringFiltersState = getFiltersStateFromQueryString(location.search);
      if (!areFilterStatesEqual(newQueryStringFiltersState, newFiltersState)) {
        this.setState({
          appliedFilters: newQueryStringFiltersState,
        });
        this.fetchData(newQueryStringFiltersState);

        return;
      }
    }

    if (newFiltersState !== prevState.appliedFilters) {
      const newQueryString = getQueryStringFromFiltersState(newFiltersState);
      if (newQueryString !== location.search) {
        history.push(`/${getQueryStringFromFiltersState(newFiltersState)}`);
      }
    }
  }

  public render() {
    const { className } = this.props;
    const { appliedFilters, isError, isLoading, isFirstLoadDone, incidentsData } = this.state;

    const filtersComponentState: IFilterComponentState = {
      dateFrom: appliedFilters.dateFrom,
      dateTo: appliedFilters.dateTo,
      query: appliedFilters.query,
    };

    return (
      <IncidentsPage
        className={className}
        activePage={appliedFilters.page}
        appliedFiltersState={filtersComponentState}
        isError={isError}
        isLoading={isLoading}
        isFirstLoadDone={isFirstLoadDone}
        pageData={incidentsData}
        onFilterLoadDataRequest={this.onFilterLoadData}
        onPageChange={this.onPageChange}
      />
    );
  }

  private readonly onFilterLoadData = (filtersState: IFilterComponentState) => {
    this.setState({
      appliedFilters: filtersState,
    });
    this.fetchData(filtersState);
  };

  private readonly onPageChange = (page: number) => {
    const { appliedFilters } = this.state;
    const newFiltersState = {
      ...appliedFilters,
      page,
    };
    this.setState({
      appliedFilters: newFiltersState,
    });
    this.fetchData(newFiltersState);
  };

  private fetchData(requestFiltersState: IFiltersState): void {
    this.setState({ isLoading: true });
    api.getIncidents(getRequestParamsFromFiltersState(requestFiltersState))
      .then((res) => {
        const { appliedFilters: newFiltersState } = this.state;
        if (!areFilterStatesEqual(requestFiltersState, newFiltersState)) {
          return;
        }

        this.setState({
          isLoading: false,
          isError: false,
          isFirstLoadDone: true,
          incidentsData: res,
        });
        window.scrollTo(window.scrollX, 0);
      })
      .catch(() => {
        const { appliedFilters: newFiltersState } = this.state;
        if (!areFilterStatesEqual(requestFiltersState, newFiltersState)) {
          return;
        }

        this.setState({ isError: true, isLoading: false, isFirstLoadDone: true });
      });
  }
}

function getFiltersStateFromQueryString(queryString: string): IFiltersState {
  const queryParams = new URLSearchParams(queryString);
  const pageParamValue = queryParams.get('page');
  const queryParamValue = queryParams.get('query');
  const dateFromParamValue = queryParams.get('dateFrom');
  const dateToParamValue = queryParams.get('dateTo');
  return {
    page: pageParamValue ? Number(pageParamValue) : undefined,
    query: queryParamValue ? decodeURIComponent(queryParamValue) : '',
    dateFrom: dateFromParamValue ? moment(Number(dateFromParamValue)) : null,
    dateTo: dateToParamValue ? moment(Number(dateToParamValue)) : null,
  };
}

function getQueryStringFromFiltersState(filtersState: IFiltersState): string {
  const queryParams = new URLSearchParams();
  if (filtersState.query) {
    queryParams.set('query', filtersState.query);
  }
  if (filtersState.dateFrom) {
    queryParams.set('dateFrom', filtersState.dateFrom.valueOf().toString());
  }
  if (filtersState.dateTo) {
    queryParams.set('dateTo', filtersState.dateTo.valueOf().toString());
  }
  if (filtersState.page) {
    queryParams.set('page', filtersState.page.toString())
  }

  const paramsStr = queryParams.toString();
  return !!paramsStr ? `?${paramsStr}` : '';
}

function getRequestParamsFromFiltersState(filtersState: IFiltersState): IGetIncidentsInput {
  return {
    dateFrom: filtersState.dateFrom ? filtersState.dateFrom.valueOf() : undefined,
    dateTo: filtersState.dateTo ? filtersState.dateTo.valueOf() : undefined,
    page: filtersState.page || 1,
    query: filtersState.query || undefined,
  };
}

function areFilterStatesEqual(a: IFiltersState, b: IFiltersState): boolean {
  const aRequestParams = getRequestParamsFromFiltersState(a);
  const bRequestParams = getRequestParamsFromFiltersState(b);

  return areObjectsShallowEqual(aRequestParams, bRequestParams);
}
