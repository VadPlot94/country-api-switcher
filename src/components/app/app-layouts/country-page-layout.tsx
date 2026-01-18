import CountryPage from '../../country-page/country-page';
import '../app.scss';
import '../../../i18n/i18n-setup';
import { useLocation, useParams } from 'react-router-dom';
import type { ICountry } from '../../../providers/types';

const CountryPageLayout = () => {
  const location = useLocation();
  const params = useParams();

  const selectedCountryData: ICountry = location.state;
  const isOpenFromUrl = location.key === 'default';
  const countryCode = selectedCountryData?.cca3 || params.cca3;

  return (
    <div className="app__country-page-container">
      <CountryPage
        isOpenFromUrl={isOpenFromUrl}
        countryCode={countryCode}
        countryData={selectedCountryData}
      />
    </div>
  );
};

export default CountryPageLayout;
