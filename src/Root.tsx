import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import App from './ui/App';

const Root: React.FC = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <App/>
  </MuiPickersUtilsProvider>
);
export default Root;
