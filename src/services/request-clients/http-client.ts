import type { CountryFields, ICountry } from '../providers/types';
import constants from '../constants.service';
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

  public callCountryByCca3Code(countryCca3Code: string): Promise<ICountry> {
    return fetch(
      constants.CountriesAPIUrls.CountryByCca3Code.replace(
        '{code}',
        encodeURIComponent(countryCca3Code),
      ),
    )
      .then(resp => resp?.json())
      .then(data => data?.[0]);
  }
}

const httpClient = new HttpClient();
export default httpClient;
