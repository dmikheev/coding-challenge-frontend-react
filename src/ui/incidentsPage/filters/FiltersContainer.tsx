import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { ChangeEvent } from 'react';
import { IFiltersState } from '../dataTypes';
import Filters from './Filters';

interface IFiltersContainerProps {
  className?: string;
  defaultFiltersState: IFiltersState;
  onChange(filtersState: IFiltersState): void;
}
const FiltersContainer: React.FC<IFiltersContainerProps> = ({
  className,
  defaultFiltersState,
  onChange,
}) => {
  const [state, setState] = React.useState<IFiltersState>({
    dateFrom: defaultFiltersState.dateFrom,
    dateTo: defaultFiltersState.dateTo,
    query: defaultFiltersState.query,
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
  const onButtonClick = React.useCallback(() => {
    onChange(state);
  }, [state, onChange]);

  return (
    <Filters
      className={className}
      filtersState={state}
      onQueryChange={onQueryChange}
      onDateFromChange={onDateFromChange}
      onDateToChange={onDateToChange}
      onSearchClick={onButtonClick}
    />
  );
};
export default FiltersContainer;
