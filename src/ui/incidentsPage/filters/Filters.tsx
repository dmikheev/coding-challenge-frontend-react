import { Button, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import React from 'react';

const Filters: React.FC = () => (
  <div>
    <FormControl variant="outlined">
      <InputLabel>Search case by title</InputLabel>
      <OutlinedInput labelWidth={0}/>
    </FormControl>
    <DatePicker label="Date from" value={null} onChange={() => {}}/>
    <DatePicker label="Date to" value={null} onChange={() => {}}/>
    <Button>
      Find cases
    </Button>
  </div>
);
export default Filters;

const DatePicker: React.FC<KeyboardDatePickerProps> = (props) => (
  <KeyboardDatePicker autoOk={true} inputVariant="outlined" variant="inline" {...props}/>
);
