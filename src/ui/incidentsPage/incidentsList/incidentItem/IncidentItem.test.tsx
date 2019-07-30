import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { IIncident } from '../../../../api/api';
import IncidentItem from './IncidentItem';

const testIncidentData: IIncident = {
  id: 123,
  title: 'Test title',
  description: 'Detailed test description',
  address: 'Test address',
  occurred_at: (new Date(2019, 0, 1)).getTime(),
  updated_at: (new Date(2019, 1, 2)).getTime(),
  source: {
    html_url: 'https://test.com/bike',
  },
  media: {
    image_url_thumb: 'https://test.com/bike/photo.jpg',
  },
};

it('renders correctly and shows incident data', () => {
  const wrapper = shallow(
    <IncidentItem className="test" data={testIncidentData}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders correctly and shows placeholder image if photo url is empty', () => {
  const incidentData: IIncident = {
    ...testIncidentData,
    media: {
      image_url_thumb: '',
    },
  };
  const wrapper = shallow(
    <IncidentItem className="test" data={incidentData}/>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
