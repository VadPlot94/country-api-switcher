export interface IOldCountry {
  name: string;
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  callingCodes?: string[];
  capital?: string;
  altSpellings?: string[];
  subregion?: string;
  region?: string;
  population?: number;

  latlng?: [number, number];
  demonym?: string;
  area?: number;
  timezones?: string[];
  borders?: string[];
  nativeName?: string;
  numericCode?: string;
  flags?: {
    svg?: string;
    png?: string;
  };
  currencies?: Array<{
    code?: string;
    name?: string;
    symbol?: string;
  }>;
  languages?: Array<{
    iso639_1?: string;
    iso639_2?: string;
    name?: string;
    nativeName?: string;
  }>;

  translations?: {
    br?: string;
    pt?: string;
    nl?: string;
    hr?: string;
    fa?: string;
    de?: string;
    es?: string;
    fr?: string;
    ja?: string;
    it?: string;
    hu?: string;
  };
  flag?: string;
  regionalBlocs?: Array<{
    acronym?: string;
    name?: string;
  }>;
  cioc?: string;
  independent?: boolean;
}

export interface ICountry {
  name: {
    common: string;
    official: string;
    nativeName?: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };

  tld?: string[];
  cca2?: string;
  ccn3?: string;
  cca3?: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;

  currencies?: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;

  idd?: {
    root: string;
    suffixes: string[];
  };

  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;

  languages?: Record<string, string>;

  translations: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;

  latlng?: [number, number];
  landlocked?: boolean;
  borders?: string[];
  area?: number;

  demonyms?: {
    eng?: {
      f: string;
      m: string;
    };
    fra?: {
      f: string;
      m: string;
    };
  };

  flag?: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };

  coatOfArms?: {
    png?: string;
    svg?: string;
  };

  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };

  population?: number;
  fifa?: string;

  car?: {
    signs: string[];
    side: 'left' | 'right';
  };

  timezones?: string[];
  continents?: string[];

  startOfWeek?: 'monday' | 'sunday' | string;

  capitalInfo?: {
    latlng?: [number, number];
  };

  postalCode?: {
    format?: string | null;
    regex?: string | null;
  };
}

export type CountryFields = keyof ICountry;
