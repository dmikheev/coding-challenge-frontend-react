import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import Pagination from 'react-js-pagination';
import { IGetIncidentsResponseResult } from '../../api/api';
import { ITEMS_PER_PAGE } from '../../constants/constants';
import * as Constants from '../../constants/constants';
import { IFiltersState } from './dataTypes';
import FiltersContainer from './filters/FiltersContainer';
import IncidentsList from './incidentsList/IncidentsList';

interface IIncidentsPageProps {
  activePage: number | undefined;
  defaultFiltersState: IFiltersState;
  pageData: IGetIncidentsResponseResult | null;
  isError: boolean;
  isLoading: boolean;
  onFilterChange(filtersState: IFiltersState): void;
  onPageChange(page: number): void;
}
const IncidentsPage: React.FC<IIncidentsPageProps> = ({
  activePage,
  defaultFiltersState,
  isError,
  isLoading,
  pageData,
  onFilterChange,
  onPageChange,
}) => {
  const contentHtml = isError ? (
    <ErrorContent/>
  ) : (
    <PageContent activePage={activePage} pageData={pageData} onPageChange={onPageChange}/>
  );

  const loaderHtml = isLoading && (
    <div>
      <CircularProgress/>
    </div>
  );

  return (
    <div>
      <FiltersContainer defaultFiltersState={defaultFiltersState} onChange={onFilterChange}/>
      <div>
        {contentHtml}
        {loaderHtml}
      </div>
    </div>
  );
};
export default IncidentsPage;

interface IPageContentProps {
  activePage: number | undefined;
  pageData: IGetIncidentsResponseResult | null;
  onPageChange(page: number): void;
}
const PageContent: React.FC<IPageContentProps> = ({ activePage, pageData, onPageChange }) => {
  const paginationHtml = (pageData && pageData.total > Constants.ITEMS_PER_PAGE) && (
    <Pagination
      totalItemsCount={pageData.total}
      activePage={activePage || 1}
      itemsCountPerPage={ITEMS_PER_PAGE}
      firstPageText="<< First"
      prevPageText="< Prev"
      nextPageText="Next >"
      lastPageText="Last >>"
      onChange={onPageChange}
    />
  );

  return (
    <React.Fragment>
      <IncidentsList data={pageData}/>
      {paginationHtml}
    </React.Fragment>
  );
};

const ErrorContent: React.FC = () => (
  <Typography color="error">Ooops, something went wrong</Typography>
);
