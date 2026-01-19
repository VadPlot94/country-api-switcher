import { useQuery } from '@tanstack/react-query';
import CountryCard from '../country-card/country-card.tsx';
import './countries-list.css';
import { useAppSelector } from '../../hooks.ts';
import { useMemo } from 'react';
import Loader from '../loader/loader.tsx';
import NotificationBanner from '../notification-banner/notification-banner.tsx';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import countryService from '../../services/country.service.ts';
import type { ICountry } from '../../providers/types.ts';
import { useTranslation } from 'react-i18next';

export default function CountriesList() {
  const selectedRegion = useAppSelector(
    state => state.filterDropdown.selectedRegion,
  );
  const { t } = useTranslation();

  const searchQuery = useAppSelector(state => state.search.searchQuery);
  const {
    data: countriesList,
    isPending,
    isError,
  } = useQuery<ICountry[]>({
    queryKey: ['countriesList'],
  });

  const countriesListAfterSelection = useMemo(
    () =>
      countryService.getCountriesBySelection(
        countriesList,
        selectedRegion,
        searchQuery,
      ),
    [countriesList, selectedRegion, searchQuery],
  );

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return (
      <NotificationBanner
        message={t('i18n.notificationBanner.ErrorGetCountriesListAPI')}
        icon={ExclamationTriangleIcon}
        isError
        buttonName="Try Again"
      />
    );
  }

  if (!countryService.isCountriesListAvailable(countriesList)) {
    return (
      <NotificationBanner
        message={t('i18n.notificationBanner.CountriesListEmpty')}
        icon={ExclamationCircleIcon}
      />
    );
  }

  if (!countryService.isCountriesListAvailable(countriesListAfterSelection)) {
    return (
      <NotificationBanner
        message={t('i18n.notificationBanner.NoMatchingCountries')}
        icon={ExclamationCircleIcon}
      />
    );
  }

  return (
    <div className="countries-list">
      {countriesListAfterSelection.map(country => {
        return (
          <CountryCard
            key={countryService.getCountryName(country)}
            country={country}
          />
        );
      })}
    </div>
  );
}
