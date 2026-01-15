import { useAppSelector } from '../../hooks';
import helperService from '../../services/helper.service';
import CountriesLayout from '../countries-layout/countries-layout';
import CountryPage from '../country-page/country-page';
import FilterDropdown from '../filter/filter-dropdown';
import Header from '../header/header';
import Search from '../search/search';
import './app.scss';
import '../../i18n/i18n-setup';
import useQueryParams from '../../custom-hooks/useQueryParams';
import VirtualCountriesLayout from '../virtual-countries-layout/virtual-countries-layout';

const App = () => {
  const { getQueryParam } = useQueryParams();
  const theme = useAppSelector(state => state.app.theme);
  const selectedCountry = useAppSelector(state => state.app.selectedCountry);
  helperService.updateHtmlTheme(theme);

  return (
    <div
      className="app"
      tabIndex={-1}
      autoFocus
    >
      <Header />
      <div className="app__container">
        {selectedCountry ? (
          <div className="app__country-page-container">
            <CountryPage country={selectedCountry} />
          </div>
        ) : (
          <div className="app__countries-layout-container">
            <div className="app__container-header">
              <Search />
              <FilterDropdown />
            </div>
            <div className="app__container-content">
              {getQueryParam('virtualTable', false) ? (
                <VirtualCountriesLayout />
              ) : (
                <CountriesLayout />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
