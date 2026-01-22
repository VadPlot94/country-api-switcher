import './countries-list.css';

import CountryCard from '@components/country-card/country-card.tsx';
import Loader from '@components/loader/loader.tsx';
import NotificationBanner from '@components/notification-banner/notification-banner.tsx';
import { useAppSelector } from '@custom-hooks/hooks.ts';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import countryService from '@services/country.service.ts';
import type { ICountry } from '@services/providers/types.ts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function CountriesList() {
  const selectedRegion = useAppSelector(
    (state) => state.filterDropdown.selectedRegion,
  );
  const { t } = useTranslation();

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
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
      {countriesListAfterSelection.map((country) => {
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
