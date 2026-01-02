import { memo } from 'react';
import { useAppDispatch } from '../../hooks';
import type { ICountry } from '../../providers/types';
import { setSelectedCountry } from '../../slices/app-slice';
import { setSelectedRegion } from '../../slices/filter-dropdown-slice';
import { setInputValue, setSearchQuery } from '../../slices/search-slice';
import './country-card.css';
import { useTranslation } from 'react-i18next';
import countryService from '../../services/country.service';
import i18n from '../../i18n/i18n-setup';

export interface ICountryCardProps {
  country: ICountry;
}

export default memo(function CountryCard(props: ICountryCardProps) {
  const { country } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleCountryClick = (country: ICountry) => {
    dispatch(setSelectedCountry(country));
    dispatch(setSelectedRegion(null));
    dispatch(setSelectedRegion(null));
    dispatch(setSearchQuery(''));
    dispatch(setInputValue(''));
  };

  const onCountryCardKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    country: ICountry,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCountryClick(country);
    }
  };

  return (
    <div
      className="country-card"
      tabIndex={0}
      onKeyDown={e => onCountryCardKeyDown(e, country)}
    >
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        className="country-card__flag"
        onClick={() => handleCountryClick(country)}
        title={t(
          'i18n.countryCard.OpenCountryDescription'.replace(
            '{0}',
            countryService.getCountryNameLabel(country),
          ),
        )}
      />
      <div className="country-card__info-container">
        <div className="country-card__name-container">
          {countryService.getCountryNameLabel(country)}
        </div>
        <div>
          <span className="country-card__title">
            {t('i18n.countryCard.Population')}:
          </span>{' '}
          {country.population?.toLocaleString(i18n.language)}
        </div>
        <div>
          <span className="country-card__title">
            {t('i18n.countryCard.Region')}:
          </span>{' '}
          {country.region}
        </div>
        <div>
          <span className="country-card__title">
            {t('i18n.countryCard.Capital')}:
          </span>{' '}
          {country.capital}
        </div>
      </div>
    </div>
  );
});
