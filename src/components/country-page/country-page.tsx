import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks';
import { setSelectedCountry } from '../../slices/app-slice';
import './country-page.css';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import countryApiProvider, {
  countryFileProvider,
} from '../../providers/country.api.provider';
import Loader from '../loader/loader';
import InfoRow from '../info-row/info-row';
import type { ICountry } from '../../providers/types';
import countryService from '../../services/country.service';
import { MemoIcon } from '../memo-icon/memo-icon';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n-setup';

export interface ICountryPageProps {
  country: ICountry;
}

export default function CountryPage(props: ICountryPageProps) {
  const { country: currentCountry } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { data: countryList } = useQuery<ICountry[]>({
    queryKey: ['countryList'],
  });
  const { data: country, isFetching } = useQuery<ICountry>({
    queryKey: ['countryByName', countryService.getCountryName(currentCountry)],
    placeholderData: currentCountry,
    queryFn: () =>
      countryApiProvider
        .getCountryDescriptionByName(
          countryService.getCountryName(currentCountry),
        )
        .catch(() =>
          countryFileProvider.getCountryDescriptionByName(
            countryService.getCountryName(currentCountry),
          ),
        ),
    refetchOnMount: true,
  });

  const handleBackButtonClick = () => {
    dispatch(setSelectedCountry(null));
  };

  const handleBorderCountryClick = (country: ICountry) => {
    dispatch(setSelectedCountry(country));
  };

  if (!country) {
    return <Loader />;
  }

  const filteredBorders = countryService
    .getBorderCountries(countryList, country.borders)
    .filter(country => !!country);

  return (
    <div className="country-page">
      <div className="country-page__back-button-container">
        <button
          className="country-page__back-button"
          onClick={handleBackButtonClick}
        >
          <MemoIcon component={ArrowLongLeftIcon} />
          <span>{t('i18n.countryPage.BackButton')}</span>
        </button>
      </div>
      <div className="country-page__content">
        <div className="country-page__flag">
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className="country-page__flag-img"
          />
        </div>
        <div className="country-page__description">
          <div className="country-page__description-name-container">
            {countryService.getCountryNameLabel(country)}
          </div>
          <div className="country-page__full-description-container">
            <div className="country-page__description-column">
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryPage.NativeName')}
                value={country.name.official}
              />
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryCard.Population')}
                value={country.population.toLocaleString(i18n.language)}
              />
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryCard.Region')}
                value={country.region}
              />
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryPage.SubRegion')}
                value={country.subregion}
              />
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryCard.Capital')}
                value={country.capital?.join(', ')}
              />
            </div>
            <div className="country-page__description-column">
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryPage.TopLevelDomain')}
                value={country.tld?.join(', ')}
              />
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryPage.Currencies')}
                value={countryService.getCurrencies(country.currencies)}
              />
              <InfoRow
                isFetching={isFetching}
                title={t('i18n.countryPage.Languages')}
                value={countryService.getLanguages(country.languages)}
              />
            </div>
          </div>
          <div className="country-page__border-countries-description-container">
            <span className="country-page__title country-page__title-border-countries">
              {t('i18n.countryPage.BorderCountries')}:{' '}
            </span>
            <div className="country-page__border-countries-buttons-container">
              {!isFetching ? (
                filteredBorders?.length ? (
                  filteredBorders.map(country => {
                    return (
                      <button
                        key={countryService.getCountryName(country)}
                        className="country-page__border-country-button"
                        onClick={() => handleBorderCountryClick(country)}
                      >
                        {countryService.getCountryNameLabel(country)}
                      </button>
                    );
                  })
                ) : (
                  '-'
                )
              ) : (
                <div className="info-row__loader-container">
                  <Loader size={4} />
                </div>
              )}
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
