import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Moment } from 'moment';
import React, { ChangeEvent } from 'react';
import { IFilterComponentState } from '../dataTypes';
import Filters from './Filters';

interface IFiltersContainerProps {
  className?: string;
  appliedFiltersState: IFilterComponentState;
  onLoadData(filtersState: IFilterComponentState): void;
}
interface IFiltersContainerState {
  filtersState: IFilterComponentState;
}
export default class FiltersContainer
  extends React.PureComponent<IFiltersContainerProps, IFiltersContainerState> {

  constructor(props: IFiltersContainerProps) {
    super(props);

    this.state = { filtersState: props.appliedFiltersState };
  }

  public render() {
    const { className } = this.props;
    const { filtersState } = this.state;

    return (
      <Filters
        className={className}
        filtersState={filtersState}
        onQueryChange={this.onQueryChange}
        onDateFromChange={this.onDateFromChange}
        onDateToChange={this.onDateToChange}
        onInputEnterPress={this.onInputEnterPress}
        onSearchButtonClick={this.onButtonClick}
      />
    );
  }

  private readonly onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      filtersState: {
        ...prevState.filtersState,
        query: event.target.value,
      },
    }));
  };

  private readonly onDateFromChange = (date: MaterialUiPickersDate | null) => {
    this.setState((prevState) => ({
      filtersState: {
        ...prevState.filtersState,
        dateFrom: date,
      },
    }));
  };

  private readonly onDateToChange = (date: MaterialUiPickersDate | null) => {
    this.setState((prevState) => ({
      filtersState: {
        ...prevState.filtersState,
        dateTo: date,
      },
    }));
  };

  private readonly onInputEnterPress = () => {
    const { appliedFiltersState, onLoadData } = this.props;
    const { filtersState } = this.state;

    if (areFilterStatesEqual(appliedFiltersState, filtersState)) {
      return;
    }

    onLoadData(filtersState);
  };

  private readonly onButtonClick = () => {
    this.props.onLoadData(this.state.filtersState);
  };
}

function areFilterStatesEqual(a: IFilterComponentState, b: IFilterComponentState): boolean {
  return a.query === b.query &&
    areDatesEqual(a.dateFrom, b.dateFrom) &&
    areDatesEqual(a.dateTo, b.dateTo);
}
function areDatesEqual(a: Moment | null, b: Moment | null): boolean {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }

  return a.isSame(b);
}
