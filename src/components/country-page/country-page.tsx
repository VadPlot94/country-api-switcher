import './country-page.css';

import InfoRow from '@components/info-row/info-row';
import Loader from '@components/loader/loader';
import { MemoIcon } from '@components/memo-icon/memo-icon';
import NotFoundPage from '@components/not-found-page/not-found-page';
import NotificationBanner from '@components/notification-banner/notification-banner';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import i18n from '@i18n-next/i18n';
import countryService from '@services/country.service';
import navigationService from '@services/navigation.service';
import countryApiProvider, {
  countryFileProvider,
} from '@services/providers/country.api.provider';
import type { ICountry } from '@services/providers/types';
import urlService from '@services/url.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ICountryPageProps {
  countryData: ICountry;
  countryCode: string;
  isOpenFromUrl: boolean;
}

export default function CountryPage(props: ICountryPageProps) {
  const { countryData, countryCode, isOpenFromUrl } = props;
  const [isLoadImgError, setLoadImgError] = useState(false);

  const { t } = useTranslation();

  const { data: countriesList, isFetching: isCountriesListFetching } = useQuery<
    ICountry[]
  >({
    queryKey: ['countriesList'],
  });
  const {
    data: country,
    isFetching: isSelectedCountryFetching,
    isError: isSelectedCountryError,
  } = useQuery<ICountry>({
    queryKey: ['countryByCca3Code', countryCode],
    placeholderData: countryData,
    queryFn: () =>
      countryApiProvider
        .getCountryDescriptionCca3Code(countryCode)
        .catch(() =>
          countryFileProvider.getCountryDescriptionCca3Code(countryCode),
        ),
    refetchOnMount: true,
  });

  const handleBackButtonClick = () => {
    navigationService.navigateToMainPage(isOpenFromUrl);
  };

  const handleBorderCountryClick = (country: ICountry) => {
    navigationService.navigateToCountry(country, true);
  };

  const isValidCountryCode = useMemo(() => {
    const { success } = urlService.validateCountryCodeParam(
      countryCode,
      countriesList,
    );
    return success;
  }, [countryCode, countriesList]);

  useEffect(() => {
    if (!country || !isValidCountryCode) {
      return;
    }
    document.title = countryService.getCountryNameLabel(country);
    const faviconLink = document.querySelector(
      'link[rel="icon"]',
    ) as HTMLLinkElement;
    if (faviconLink) {
      const originalHref = faviconLink.href;
      const flagUrl = country.flags.svg || country.flags.png || originalHref;
      faviconLink.href = flagUrl;
      faviconLink.type = country.flags.svg ? 'image/svg+xml' : 'image/png';
      setEmojiFaviconIfImgLoadFailed(faviconLink, flagUrl);
      return () => {
        faviconLink.href = originalHref;
        document.title = t('i18n.app.Title');
      };
    }
  }, [isValidCountryCode, country]);

  const setEmojiFaviconIfImgLoadFailed = (
    faviconLink: HTMLLinkElement,
    flagUrl: string,
  ) => {
    const testImg = new Image();
    testImg.src = flagUrl;
    testImg.onerror = () => {
      faviconLink.href = countryService.getEmojiForImg(country.flag);
      faviconLink.type = 'image/svg+xml';
    };
  };

  // country = null if countryData = null
  // This happen when open direct url like: http://localhost:3000/country/blabla
  if (!country) {
    if (isCountriesListFetching) {
      return <Loader />;
    }

    if (!isValidCountryCode) {
      return <NotFoundPage />;
    }
    if (!isSelectedCountryFetching && isSelectedCountryError && !countryData) {
      return (
        <NotificationBanner
          message={t('i18n.notificationBanner.ErrorGetCountryByCode').replace(
            '{0}',
            countryCode,
          )}
        />
      );
    }

    // isSelectedCountryFetching = true
    return <Loader />;
  }

  const filteredBorders = countryService
    .getBorderCountries(countriesList, country.borders)
    .filter((country) => !!country);

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
            src={
              isLoadImgError
                ? countryService.getEmojiForImg(country.flag, {
                    y: '50',
                    size: 80,
                  })
                : country.flags.svg
            }
            alt={country.flags.alt}
            onError={() => setLoadImgError(true)}
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
                isFetching={isSelectedCountryFetching}
                title={t('i18n.countryPage.NativeName')}
                value={country.name.official}
              />
              <InfoRow
                isFetching={isSelectedCountryFetching}
                title={t('i18n.countryCard.Population')}
                value={country.population.toLocaleString(i18n.language)}
              />
              <InfoRow
                isFetching={isSelectedCountryFetching}
                title={t('i18n.countryCard.Region')}
                value={country.region}
              />
              <InfoRow
                isFetching={isSelectedCountryFetching}
                title={t('i18n.countryPage.SubRegion')}
                value={country.subregion}
              />
              <InfoRow
                isFetching={isSelectedCountryFetching}
                title={t('i18n.countryCard.Capital')}
                value={country.capital?.join(', ')}
              />
            </div>
            <div className="country-page__description-column">
              <InfoRow
                isFetching={isSelectedCountryFetching}
                title={t('i18n.countryPage.TopLevelDomain')}
                value={country.tld?.join(', ')}
              />
              <InfoRow
                isFetching={isSelectedCountryFetching}
                title={t('i18n.countryPage.Currencies')}
                value={countryService.getCurrencies(country.currencies)}
              />
              <InfoRow
                isFetching={isSelectedCountryFetching}
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
              {!isSelectedCountryFetching ? (
                filteredBorders?.length ? (
                  filteredBorders.map((country) => {
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
