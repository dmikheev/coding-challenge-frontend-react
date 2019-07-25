import React from 'react';
import Pagination from 'react-js-pagination';
import Filters from './filters/Filters';
import List from './list/List';

const IncidentsPage: React.FC = () => (
  <div>
    <Filters/>
    <List/>
    <Pagination totalItemsCount={0} activePage={1} onChange={() => {}}/>
  </div>
);
export default IncidentsPage;
