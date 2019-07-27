import * as Constants from '../constants/constants';

export interface IGetIncidentsResponseResult {
  incidents: IIncident[];
  total: number;
}

export interface IGetIncidentsInput {
  dateFrom?: number;
  dateTo?: number;
  page?: number;
  query?: string;
}

interface IGetIncidentsRawResponse {
  incidents: IIncident[];
}
export interface IIncident {
  id: number;
  title: string;
  description: string;
  address: string;
  occurred_at: number;
  updated_at: number;
  source: {
    html_url: string;
  };
  media: {
    image_url_thumb: string;
  };
}

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const ORIGINAL_URL = 'https://bikewise.org:443/api/v2/incidents';

const INCIDENT_TYPE = 'theft';
const PROXIMITY = 'Berlin, DE';
const PROXIMITY_SQUARE = 50;

function getUrl(inputParams: IGetIncidentsInput): string {
  const params = {
    page: inputParams.page,
    query: inputParams.query ? encodeURIComponent(inputParams.query) : undefined,
    occurred_before: inputParams.dateTo,
    occurred_after: inputParams.dateFrom,
    per_page: Constants.ITEMS_PER_PAGE,
    incident_type: INCIDENT_TYPE,
    proximity: encodeURIComponent(PROXIMITY),
    proximity_square: PROXIMITY_SQUARE,
  };
  const paramsStr = (Object.keys(params) as Array<keyof typeof params>)
    .filter((paramName) => params[paramName] !== undefined)
    .map((paramName) => `${paramName}=${params[paramName]}`)
    .join('&');

  return `${PROXY_URL}${ORIGINAL_URL}?${paramsStr}`;
}

const api = {
  getIncidents(params: IGetIncidentsInput = {}): Promise<IGetIncidentsResponseResult> {
    return fetch(getUrl(params))
      .then((res) => {
        if (!res.ok) {
          throw res;
        }

        return res.json()
          .then((responseJson: IGetIncidentsRawResponse) => {
            return {
              incidents: responseJson.incidents,
              total: Number(res.headers.get('total')),
            };
          });
      });
  },
};
export default api;
