import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { IGetIncidentsResponseResult } from '../../../api/api';
import IncidentItem from './incidentItem/IncidentItem';

interface IIncidentsListProps {
  className?: string;
  data: IGetIncidentsResponseResult;
}
const IncidentsList: React.FC<IIncidentsListProps> = ({ className, data }) => {
  const itemsHtml = data.incidents.map((incident) => (
    <StyledIncidentItem key={incident.id} data={incident}/>
  ));
  
  return (
    <div className={className}>
      <StyledTotalText>Total: {data.total}</StyledTotalText>
      {itemsHtml}
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
