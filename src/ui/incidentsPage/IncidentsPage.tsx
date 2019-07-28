import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import styled, { css } from 'styled-components';
import { IGetIncidentsResponseResult } from '../../api/api';
import { ITEMS_PER_PAGE } from '../../constants/constants';
import * as Constants from '../../constants/constants';
import { IFilterComponentState } from './dataTypes';
import FiltersContainer from './filters/FiltersContainer';
import IncidentsList from './incidentsList/IncidentsList';
import Pagination from './pagination/Pagination';

const LOADER_SIZE = 60;

interface IIncidentsPageProps {
  className?: string;
  activePage: number | undefined;
  appliedFiltersState: IFilterComponentState;
  pageData: IGetIncidentsResponseResult | null;
  isError: boolean;
  isLoading: boolean;
  isFirstLoadDone: boolean;
  onFilterLoadData(filtersState: IFilterComponentState): void;
  onPageChange(page: number): void;
}
const IncidentsPage: React.FC<IIncidentsPageProps> = ({
  className,
  activePage,
  appliedFiltersState,
  isError,
  isLoading,
  isFirstLoadDone,
  pageData,
  onFilterLoadData,
  onPageChange,
}) => {
  let contentHtml;
  let paginationHtml;
  if (isError) {
    contentHtml = <ErrorContent/>;
  } else {
    contentHtml = <IncidentsList data={pageData}/>;
    paginationHtml = (pageData && pageData.total > Constants.ITEMS_PER_PAGE) && (
      <StyledPagination
        totalItemsCount={pageData.total}
        activePage={activePage || 1}
        itemsCountPerPage={ITEMS_PER_PAGE}
        onChange={onPageChange}
      />
    );
  }

  const loaderHtml = isLoading && (
    <LoaderDimmerWrap withBackground={isFirstLoadDone}>
      <StyledLoader size={LOADER_SIZE}/>
    </LoaderDimmerWrap>
  );

  return (
    <div className={className}>
      <StyledFiltersContainer
        appliedFiltersState={appliedFiltersState}
        onLoadData={onFilterLoadData}
      />
      <ContentWrap>
        {contentHtml}
        {loaderHtml}
      </ContentWrap>
      {paginationHtml}
    </div>
  );
};
export default IncidentsPage;

const StyledFiltersContainer = styled(FiltersContainer)`
  margin-bottom: 20px;
`;

const ContentWrap = styled.div`
  position: relative;
  min-height: 200px;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 30px;
`;

interface ILoaderWrapProps {
  withBackground: boolean;
}
const LoaderDimmerWrap = styled.div<ILoaderWrapProps>`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
    
  ${props => props.withBackground && css`
    background-color: rgba(0,0,0,0.4);
    box-shadow: 
      0 1px 5px 0 rgba(0,0,0,0.2), 
      0 2px 2px 0 rgba(0,0,0,0.14), 
      0 3px 1px -2px rgba(0,0,0,0.12);
  `}
`;
const StyledLoader = styled(CircularProgress)`
  position: sticky;
  top: calc(50% - ${Math.round(LOADER_SIZE / 2)}px);
  display: block;
  margin: 74px auto 78px;
`;

const ErrorContent: React.FC = () => (
  <Typography color="error">Ooops, something went wrong</Typography>
);
