import React from 'react';
import { IIncident } from '../../../../api/api';

interface IIncidentItemProps {
  className?: string;
  data: IIncident;
}
const IncidentItem: React.FC<IIncidentItemProps> = ({ className, data }) => (
  <div className={className}>
    {data.title}
  </div>
);
export default IncidentItem;
