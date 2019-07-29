import fetchMock from 'fetch-mock';
import api, { IGetIncidentsInput } from './api';

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

    const firstCallUrlStr = fetchMock.lastUrl();
    expect(firstCallUrlStr).toBeTruthy();
    const firstCallUrl = new URL(fetchMock.lastUrl()!);
    expect(firstCallUrl.origin).toBe('https://cors-anywhere.herokuapp.com');
    expect(firstCallUrl.pathname).toBe('/https://bikewise.org:443/api/v2/incidents');
    expect(firstCallUrl.searchParams.get('page')).toBe('1');
    expect(firstCallUrl.searchParams.get('per_page')).toBe('10');
    expect(firstCallUrl.searchParams.get('incident_type')).toBe('theft');
    expect(firstCallUrl.searchParams.get('proximity')).toBe('Berlin, DE');
    expect(firstCallUrl.searchParams.get('proximity_square')).toBe('50');

    const secondCallParams: IGetIncidentsInput = {
      page: 3,
      query: 'bike',
      dateFrom: new Date(2019, 6, 2).getTime(),
      dateTo: new Date(2019, 6, 29).getTime(),
    };
    await api.getIncidents(secondCallParams);
    expect(fetchMock.calls()).toHaveLength(2);

    const secondCallUrlStr = fetchMock.lastUrl();
    expect(secondCallUrlStr).toBeTruthy();
    const secondCallUrl = new URL(fetchMock.lastUrl()!);
    expect(secondCallUrl.origin).toBe('https://cors-anywhere.herokuapp.com');
    expect(secondCallUrl.pathname).toBe('/https://bikewise.org:443/api/v2/incidents');
    expect(secondCallUrl.searchParams.get('page')).toBe(secondCallParams.page!.toString());
    expect(secondCallUrl.searchParams.get('query')).toBe(secondCallParams.query);
    expect(secondCallUrl.searchParams.get('occurred_after')).toBe((secondCallParams.dateFrom! / 1000).toString());
    expect(secondCallUrl.searchParams.get('occurred_before')).toBe((secondCallParams.dateTo! / 1000).toString());
    expect(secondCallUrl.searchParams.get('per_page')).toBe('10');
    expect(secondCallUrl.searchParams.get('incident_type')).toBe('theft');
    expect(secondCallUrl.searchParams.get('proximity')).toBe('Berlin, DE');
    expect(secondCallUrl.searchParams.get('proximity_square')).toBe('50');
  });

  it('resolves with the response json on success', async () => {
    const responseIncident = {
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
    };
    const resultIncident = {
      ...responseIncident,
      occurred_at: responseIncident.occurred_at * 1000,
      updated_at: responseIncident.updated_at * 1000,
    };

    const incidents = [responseIncident];
    fetchMock.get('*', {
      body: { incidents },
      headers: { total: '1' },
    });

    const result = await api.getIncidents();
    expect(fetchMock.calls()).toHaveLength(1);
    expect(result).toStrictEqual({
      incidents: [resultIncident],
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
