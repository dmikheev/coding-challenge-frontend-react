import { Button, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { KeyCode } from '../../../constants/keyCodes';
import { IFiltersState } from '../dataTypes';

interface IFiltersProps {
  className?: string;
  filtersState: IFiltersState;
  onQueryChange(event: ChangeEvent<HTMLInputElement>): void;
  onDateFromChange(date: MaterialUiPickersDate | null): void;
  onDateToChange(date: MaterialUiPickersDate | null): void;
  onSearchClick(): void;
}
const Filters: React.FC<IFiltersProps> = ({
  className,
  filtersState,
  onQueryChange,
  onDateFromChange,
  onDateToChange,
  onSearchClick,
}) => {
  const onInputKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === KeyCode.ENTER) {
      onSearchClick();
      (event.target as HTMLInputElement).blur();
    }
  }, [onSearchClick]);

  return (
    <StyledWrap className={className}>
      <StyledQueryFormControl variant="outlined">
        <InputLabel>Search case by title</InputLabel>
        <OutlinedInput
          labelWidth={141}
          value={filtersState.query}
          onChange={onQueryChange}
          onKeyPress={onInputKeyPress}
        />
      </StyledQueryFormControl>
      <DatePicker
        label="Date from"
        value={filtersState.dateFrom}
        onChange={onDateFromChange}
        onKeyPress={onInputKeyPress}
      />
      <DatePicker
        label="Date to"
        value={filtersState.dateTo}
        onChange={onDateToChange}
        onKeyPress={onInputKeyPress}
      />
      <Button variant="contained" color="primary" onClick={onSearchClick}>
        Find cases
      </Button>
    </StyledWrap>
  );
};
export default Filters;

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  
  & > *:not(:last-child) {
    margin-right: 20px;
  } 
`;

const StyledQueryFormControl = styled(FormControl)`
  flex-grow: 1;
`;

const DatePicker: React.FC<KeyboardDatePickerProps> = (props) => (
  <KeyboardDatePicker autoOk={true} format="L" inputVariant="outlined" variant="inline" {...props}/>
);
