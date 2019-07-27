import { Button, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { ChangeEvent } from 'react';
import { KeyCode } from '../../../constants/keyCodes';
import { IFiltersState } from '../dataTypes';

interface IFiltersProps {
  filtersState: IFiltersState;
  onQueryChange(event: ChangeEvent<HTMLInputElement>): void;
  onDateFromChange(date: MaterialUiPickersDate | null): void;
  onDateToChange(date: MaterialUiPickersDate | null): void;
  onSearchClick(): void;
}
const Filters: React.FC<IFiltersProps> = ({
  filtersState,
  onQueryChange,
  onDateFromChange,
  onDateToChange,
  onSearchClick,
}) => {
  const onInputKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === KeyCode.ENTER) {
      onSearchClick();
    }
  }, [onSearchClick]);

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel>Search case by title</InputLabel>
        <OutlinedInput
          labelWidth={141}
          value={filtersState.query}
          onChange={onQueryChange}
          onKeyPress={onInputKeyPress}
        />
      </FormControl>
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
      <Button onClick={onSearchClick}>
        Find cases
      </Button>
    </div>
  );
};
export default Filters;

const DatePicker: React.FC<KeyboardDatePickerProps> = (props) => (
  <KeyboardDatePicker autoOk={true} format="L" inputVariant="outlined" variant="inline" {...props}/>
);
