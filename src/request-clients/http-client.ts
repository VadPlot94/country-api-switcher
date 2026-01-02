import type { CountryFields, ICountry } from '../providers/types';
import constants from '../services/constants.service';
import type { IRequestClient } from './types';

class HttpClient implements IRequestClient {
  public init(): Promise<void> {
    return Promise.resolve();
  }

  public callAllCountries(fields: CountryFields[]): Promise<ICountry[]> {
    return fetch(constants.CountriesAPIUrls.AllCountries + fields.join()).then(
      resp => resp?.json() as Promise<ICountry[]>,
    );
  }

  public callCountryByName(name: string): Promise<ICountry> {
    return fetch(
      constants.CountriesAPIUrls.CountryByName.replace(
        '{name}',
        encodeURIComponent(name),
      ),
    )
      .then(resp => resp?.json())
      .then(data => data?.[0]);
  }
}

const httpClient = new HttpClient();
export default httpClient;
