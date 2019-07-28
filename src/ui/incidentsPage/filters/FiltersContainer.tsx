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
const FiltersContainer: React.FC<IFiltersContainerProps> = ({
  className,
  appliedFiltersState,
  onLoadData,
}) => {
  const [state, setState] = React.useState<IFilterComponentState>({
    dateFrom: appliedFiltersState.dateFrom,
    dateTo: appliedFiltersState.dateTo,
    query: appliedFiltersState.query,
  });
  const onQueryChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => setState({
    ...state,
    query: event.target.value,
  }), [state]);
  const onDateFromChange = React.useCallback((date: MaterialUiPickersDate | null) => setState({
    ...state,
    dateFrom: date,
  }), [state]);
  const onDateToChange = React.useCallback((date: MaterialUiPickersDate | null) => setState({
    ...state,
    dateTo: date,
  }), [state]);

  const onInputEnterPress = React.useCallback(() => {
    if (areFilterStatesEqual(appliedFiltersState, state)) {
      return;
    }

    onLoadData(state);
  }, [appliedFiltersState, state, onLoadData]);
  const onButtonClick = React.useCallback(() => {
    onLoadData(state);
  }, [state, onLoadData]);

  return (
    <Filters
      className={className}
      filtersState={state}
      onQueryChange={onQueryChange}
      onDateFromChange={onDateFromChange}
      onDateToChange={onDateToChange}
      onInputEnterPress={onInputEnterPress}
      onSearchButtonClick={onButtonClick}
    />
  );
};
export default FiltersContainer;

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
