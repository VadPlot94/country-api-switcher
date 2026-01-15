import { useQuery } from '@tanstack/react-query';
import CountryCard from '../country-card/country-card.tsx';
import './virtual-countries-layout.css';
import { useAppSelector } from '../../hooks.ts';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Loader from '../loader/loader.tsx';
import NotificationBanner from '../notification-banner/notification-banner.tsx';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import countryService from '../../services/country.service.ts';
import type { ICountry } from '../../providers/types.ts';
import { useTranslation } from 'react-i18next';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import constants from '../../services/constants.service.ts';
import { useMediaQuery } from 'usehooks-ts';

export default function CountriesLayout() {
  const selectedRegion = useAppSelector(
    state => state.filterDropdown.selectedRegion,
  );
  const { t } = useTranslation();

  const searchQuery = useAppSelector(state => state.search.searchQuery);
  const {
    data: countryList,
    isPending,
    isError,
  } = useQuery<ICountry[]>({
    queryKey: ['countryList'],
  });

  const countriesListAfterSelection = useMemo(
    () =>
      countryService.getCountriesBySelection(
        countryList,
        selectedRegion,
        searchQuery,
      ),
    [countryList, selectedRegion, searchQuery],
  );

  const isMobile = useMediaQuery('(max-width: 615px)');

  const countryRowContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const gap = 25;
  const countryWidth = 272;
  useEffect(() => {
    const updateWidth = () => {
      if (countryRowContainerRef.current) {
        setContainerWidth(countryRowContainerRef.current.clientWidth);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    const resizeObserver = new ResizeObserver(updateWidth);
    if (countryRowContainerRef.current) {
      resizeObserver.observe(countryRowContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      resizeObserver.disconnect();
    };
  }, []);

  const columnCount = useMemo(() => {
    if (!countriesListAfterSelection?.length || !containerWidth) {
      return 1;
    }

    const itemsPerRow = Math.floor(
      (containerWidth + gap) / (countryWidth + gap),
    );

    return Math.max(1, itemsPerRow);
  }, [countriesListAfterSelection, containerWidth]);

  const rowCount = countriesListAfterSelection?.length ? Math.ceil(countriesListAfterSelection?.length / columnCount) : 0;
  const rowHeight = constants.CountryCardElementHeight + gap;

  useLayoutEffect(() => {
    if (!countriesListAfterSelection?.length) {
      return;
    }
    const realContainerHeight =
      Math.floor((countriesListAfterSelection.length / columnCount) * rowHeight) - 270;
    const fullContainerHeight = `${realContainerHeight}px`;
    document.documentElement.style.height = fullContainerHeight;
    document.body.style.height = fullContainerHeight;
  }, [countriesListAfterSelection, rowCount, rowHeight, columnCount]);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowHeight,
    overscan: 10,
    // measureElement
  });
  const virtualRows = virtualizer.getVirtualItems();

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return (
      <NotificationBanner
        message={t('i18n.notificationBanner.ErrorGetCountryListAPI')}
        icon={ExclamationTriangleIcon}
        isError
        buttonName="Try Again"
      />
    );
  }

  if (!countryService.isCountriesListAvailable(countryList)) {
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
    <div
      className="virtual-countries-layout"
      ref={ref => {
        countryRowContainerRef.current = ref;
        if (ref) {
          setContainerWidth(countryRowContainerRef.current.clientWidth);
        }
      }}
    >
      {virtualRows.map(virtualRow => {
        const startIndex = virtualRow.index * columnCount;
        const rowCountries = countriesListAfterSelection.slice(
          startIndex,
          startIndex + columnCount,
        );

        return (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
              display: 'grid',
              ...(isMobile ? {
                gridTemplateColumns: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
              } : {
                gridTemplateColumns: `repeat(${columnCount}, minmax(var(--country-width), auto))`,
                justifyContent: 'space-between',
              }),
            }}
          >
            {rowCountries.map(country => (
              <CountryCard
                key={country.cca3}
                country={country}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
