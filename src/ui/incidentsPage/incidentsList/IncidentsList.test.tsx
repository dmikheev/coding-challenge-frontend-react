import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { IGetIncidentsResponseResult } from '../../../api/api';
import IncidentsList from './IncidentsList';

it('renders correctly', () => {
  const incidentsData: IGetIncidentsResponseResult = {
    incidents: [
      {
        id: 1,
        title: 'Test title 1',
        description: 'Detailed test description 1',
        address: 'Test address 1',
        occurred_at: Date.UTC(2019, 0, 1),
        updated_at: Date.UTC(2019, 1, 1),
        source: {
          html_url: 'https://test.com/bike/1',
        },
        media: {
          image_url_thumb: 'https://test.com/bike/1/photo.jpg',
        },
      },
      {
        id: 2,
        title: 'Test title 2',
        description: 'Detailed test description 2',
        address: 'Test address 2',
        occurred_at: Date.UTC(2019, 0, 2),
        updated_at: Date.UTC(2019, 1, 2),
        source: {
          html_url: 'https://test.com/bike/2',
        },
        media: {
          image_url_thumb: 'https://test.com/bike/2/photo.jpg',
        },
      },
      {
        id: 3,
        title: 'Test title 3',
        description: 'Detailed test description 3',
        address: 'Test address 3',
        occurred_at: Date.UTC(2019, 0, 3),
        updated_at: Date.UTC(2019, 1, 3),
        source: {
          html_url: 'https://test.com/bike/3',
        },
        media: {
          image_url_thumb: 'https://test.com/bike/3/photo.jpg',
        },
      },
    ],
    total: 3,
  };

  const wrapper = shallow(
    <IncidentsList className="test" data={incidentsData}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
