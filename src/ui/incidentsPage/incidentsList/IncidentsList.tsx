import { Typography } from '@material-ui/core';
import React from 'react';
import { IGetIncidentsResponseResult } from '../../../api/api';
import IncidentItem from './incidentItem/IncidentItem';

interface IIncidentsListProps {
  data: IGetIncidentsResponseResult | null;
}
const IncidentsList: React.FC<IIncidentsListProps> = ({ data }) => {
  const total = (data && data.total) || 0;
  const itemsHtml = data && data.incidents.map((incident) => (
    <IncidentItem key={incident.id} data={incident}/>
  ));
  
  return (
    <div>
      <Typography>Total: {total}</Typography>
      {itemsHtml}
    </div>
  );
};
export default IncidentsList;
