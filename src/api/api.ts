interface IApiResponseResult {
  incidents: IIncident[];
  total: number;
}

interface IRawResponse {
  incidents: IIncident[];
}
interface IIncident {
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

const PER_PAGE = 10;
const INCIDENT_TYPE = 'theft';
const PROXIMITY = 'Berlin, DE';
const PROXIMITY_SQUARE = 50;

function getUrl(page: number): string {
  const params = {
    page,
    per_page: PER_PAGE,
    incident_type: INCIDENT_TYPE,
    proximity: encodeURIComponent(PROXIMITY),
    proximity_square: PROXIMITY_SQUARE,
  };
  const paramsStr = (Object.keys(params) as Array<keyof typeof params>)
    .map((paramName) => `${paramName}=${params[paramName]}`)
    .join('&');

  return `${PROXY_URL}${ORIGINAL_URL}?${paramsStr}`;
}

const api = {
  getIncidents(page = 1): Promise<IApiResponseResult> {
    return fetch(getUrl(page))
      .then((res) => {
        if (!res.ok) {
          throw res;
        }

        return res.json()
          .then((responseJson: IRawResponse) => {
            return {
              incidents: responseJson.incidents,
              total: Number(res.headers.get('total')),
            };
          });
      });
  },
};
export default api;
