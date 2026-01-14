export enum Theme {
  LightMode = 'light-mode',
  DarkMode = 'dark-mode',
}

class ConstantsService {
  private APICountriesUrl = 'https://restcountries.com/';
  // Fields inside API can be changed in different versions
  private CountriesApiVersion = 'v3.1';

  public CountriesAPIUrls = {
    AllCountries: `${this.APICountriesUrl}${this.CountriesApiVersion}/all?fields=`,
    CountryByName: `${this.APICountriesUrl}${this.CountriesApiVersion}/name/{name}?fullText=true`,
  };
  public CountriesJsonFilePath = './assets/countries.v3.1.json';
  // API forbid request more then 10 fields at once due to performance impact
  public MaxApiFieldsCount = 10;

  public DefaultLanguage = 'en';
  public Iso6391To6393LangMapper: Record<string, string> = {
    ar: 'ara', // Arabic
    br: 'bre', // Breton
    cs: 'ces', // Czech
    cy: 'cym', // Welsh
    de: 'deu', // German
    et: 'est', // Estonian
    fi: 'fin', // Finnish
    fr: 'fra', // French
    hr: 'hrv', // Croatian
    hu: 'hun', // Hungarian
    id: 'ind', // Indonesian
    it: 'ita', // Italian
    ja: 'jpn', // Japanese
    ko: 'kor', // Korean
    nl: 'nld', // Dutch
    fa: 'per', // Persian (Farsi)
    pl: 'pol', // Polish
    pt: 'por', // Portuguese
    ru: 'rus', // Russian
    sk: 'slk', // Slovak
    es: 'spa', // Spanish
    sr: 'srp', // Serbian
    sv: 'swe', // Swedish
    tr: 'tur', // Turkish
    ur: 'urd', // Urdu
    zh: 'zho', // Chinese
  };

  public CountryCardElementHeight = 345;
}

const constants = new ConstantsService();
export default constants;
