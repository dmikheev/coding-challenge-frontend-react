import { Moment } from 'moment';

export interface IFiltersState {
  query: string;
  dateFrom: Moment | null;
  dateTo: Moment | null;
}
