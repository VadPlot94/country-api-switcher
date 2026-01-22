import { useAppSelector } from '@custom-hooks/hooks';
import helperService from '@services/helper.service';
import CountriesLayout from '@components/countries-list/countries-list';
import CountryPage from '@components/country-page/country-page';
import FilterDropdown from '@components/filter/filter-dropdown';
import Header from '@components/header/header';
import Search from '@components/search/search';
import appCssStyles from './__css_modules_test/app.module.css';
import '@i18n-next/i18n';

const App = () => {
  const theme = useAppSelector(state => state.app.theme);
  const selectedCountry = useAppSelector(state => state.app.selectedCountry);
  helperService.updateHtmlTheme(theme);

  return (
    <div
      className={appCssStyles['app']}
      tabIndex={-1}
      autoFocus
    >
      <Header />
      <div className={appCssStyles['app__container']}>
        {selectedCountry ? (
          <div className={appCssStyles['app__country-page-container']}>
            <CountryPage country={selectedCountry} />
          </div>
        ) : (
          <div className={appCssStyles['app__countries-layout-container']}>
            <div className={appCssStyles['app__container-header']}>
              <Search />
              <FilterDropdown />
            </div>
            <div className={appCssStyles['app__container-content']}>
              <CountriesLayout />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
