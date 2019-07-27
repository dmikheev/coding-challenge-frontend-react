import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { IGetIncidentsResponseResult } from '../../../api/api';
import IncidentItem from './incidentItem/IncidentItem';

interface IIncidentsListProps {
  className?: string;
  data: IGetIncidentsResponseResult | null;
}
const IncidentsList: React.FC<IIncidentsListProps> = ({ className, data }) => {
  let contentHtml;
  if (data && data.total > 0) {
    const total = (data && data.total) || 0;
    const itemsHtml = data && data.incidents.map((incident) => (
      <StyledIncidentItem key={incident.id} data={incident}/>
    ));

    contentHtml = (
      <React.Fragment>
        <StyledTotalText>Total: {total}</StyledTotalText>
        {itemsHtml}
      </React.Fragment>
    );
  } else if (data) {
    contentHtml = (
      <NoResultsText>
        No results
      </NoResultsText>
    );
  }
  
  return (
    <div className={className}>
      {contentHtml}
    </div>
  );
};
export default IncidentsList;

const StyledTotalText = styled(Typography)`
  margin-bottom: 10px;
  text-align: right;
`;

const StyledIncidentItem = styled(IncidentItem)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const NoResultsText = styled(Typography)`
  padding: 10px;
`;
