import CountryPage from '../../country-page/country-page';
import '../app.scss';
import '../../../i18n/i18n-setup';
import { useLocation, useParams } from 'react-router-dom';
import type { ICountry } from '../../../providers/types';
import urlService from '../../../services/url.service';
import NotFoundPage from '../../not-found-page/not-found-page';
import { useMemo } from 'react';

const CountryPageLayout = () => {
  const location = useLocation();
  const params = useParams();

  const selectedCountryData: ICountry = location.state;
  const isOpenFromUrl = location.key === 'default';
  const countryCode = selectedCountryData?.cca3 || params.cca3;

  const isValidCountryCode = useMemo(() => {
    const { success } = urlService.validateCountryCodeParam(countryCode);
    return success;
  }, [countryCode]);

  return (
    <div className="app__country-page-container">
      {isValidCountryCode ? (
        <CountryPage
          isOpenFromUrl={isOpenFromUrl}
          countryCode={countryCode}
          countryData={selectedCountryData}
        />
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default CountryPageLayout;
