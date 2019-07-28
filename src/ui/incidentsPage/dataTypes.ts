import { Moment } from 'moment';

export interface IFiltersState extends IFilterComponentState {
  page?: number;
}
export interface IFilterComponentState {
  query: string;
  dateFrom: Moment | null;
  dateTo: Moment | null;
}
