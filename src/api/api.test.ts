import fetchMock from 'fetch-mock';
import api from './api';

describe('API', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches data from the right url', async () => {
    fetchMock.get('*', {
      body: { incidents: [] },
      headers: { total: '0' },
    });

    await api.getIncidents();
    expect(fetchMock.calls()).toHaveLength(1);
    expect(fetchMock.lastUrl()).toBe(`https://cors-anywhere.herokuapp.com/https://bikewise.org:443/api/v2/incidents?page=1&per_page=10&incident_type=theft&proximity=${encodeURIComponent('Berlin, DE')}&proximity_square=50`);

    await api.getIncidents(3);
    expect(fetchMock.calls()).toHaveLength(2);
    expect(fetchMock.lastUrl()).toBe(`https://cors-anywhere.herokuapp.com/https://bikewise.org:443/api/v2/incidents?page=3&per_page=10&incident_type=theft&proximity=${encodeURIComponent('Berlin, DE')}&proximity_square=50`)
  });

  it('resolves with the response json on success', async () => {
    const incidents = [{
      id: 104057,
      title: 'Stolen 2018 Intec M05(green)',
      description: '',
      address: 'Berlin, 10961, DE',
      occurred_at: 1563649200,
      updated_at: 1564056041,
      source: {
        html_url: 'https://bikeindex.org/bikes/634338',
      },
      media: {
        image_url_thumb: 'https://files.bikeindex.org/uploads/Pu/171073/small_IntecM05.png',
      },
    }];
    fetchMock.get('*', {
      body: { incidents },
      headers: { total: '1' },
    });

    const result = await api.getIncidents();
    expect(fetchMock.calls()).toHaveLength(1);
    expect(result).toStrictEqual({
      incidents,
      total: 1,
    });
  });

  it('rejects with the response data on error', async () => {
    const expectedErrorCode = 400;
    fetchMock.get('*', expectedErrorCode);

    let errorData;
    try {
      await api.getIncidents();
    } catch (errData) {
      errorData = errData;
    }
    expect(fetchMock.calls()).toHaveLength(1);
    expect(errorData.status).toBe(expectedErrorCode);
  });
});
