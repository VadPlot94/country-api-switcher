import './filter-dropdown.css';

import { MemoIcon } from '@components/memo-icon/memo-icon';
import { useAppDispatch, useAppSelector } from '@custom-hooks/hooks';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import i18n from '@i18n-next/i18n';
import {
  setSelectedRegion,
  toggleDropdown,
} from '@redux-settings/slices/filter-dropdown-slice';
import countryService from '@services/country.service';
import type { ICountry } from '@services/providers/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function FilterDropdown() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isOpen = useAppSelector((state) => state.filterDropdown.isOpen);
  const selectedRegion = useAppSelector(
    (state) => state.filterDropdown.selectedRegion,
  );

  const {
    data: countriesList = [],
    isPending,
    isError,
  } = useQuery<ICountry[]>({
    queryKey: ['countriesList'],
  });

  const regions = useMemo(
    () => countryService.getRegions(countriesList),
    [countriesList],
  );

  const handleSelect = (region: string) => {
    dispatch(setSelectedRegion(region));
    dispatch(toggleDropdown());
  };

  const getRegionTranslation = (region: string): string => {
    const regionLocaleKey = `i18n.filter.${region || 'FilterByRegion'}`;
    if (region && !i18n.exists(regionLocaleKey)) {
      return region;
    }
    return t(regionLocaleKey);
  };

  const filterDropdownMenuDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        filterDropdownMenuDivRef.current &&
        !filterDropdownMenuDivRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleDropdown());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <div
      className="filter-dropdown"
      ref={filterDropdownMenuDivRef}
      role="group"
    >
      <button
        id="filter-dropdown-toggle"
        type="button"
        className="filter-dropdown__toggle-button"
        disabled={isPending || isError}
        onClick={() => dispatch(toggleDropdown())}
        aria-haspopup="listbox"
        aria-controls="filter-dropdown-menu"
        aria-expanded={isOpen}
        aria-disabled={isPending || isError}
        aria-label={isOpen ? 'Close Region Filter' : 'Open Region Filter'}
        tabIndex={0}
      >
        <div className="filter-dropdown__button-container">
          <div aria-live="polite">
            {getRegionTranslation(selectedRegion) ||
              t('i18n.filter.FilterByRegion')}
          </div>
          <div
            className="filter-dropdown__chevron-container"
            aria-hidden="true"
          >
            {isOpen ? (
              <MemoIcon
                component={ChevronDownIcon}
                className="filter-dropdown__icon-arrow-down"
                aria-hidden="true"
              />
            ) : (
              <MemoIcon
                component={ChevronUpIcon}
                className="filter-dropdown__icon-arrow-up"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </button>
      {isOpen && (
        <div
          id="filter-dropdown-menu"
          className="filter-dropdown__menu"
          role="listbox"
          aria-labelledby="filter-dropdown-toggle"
        >
          <div
            className="filter-dropdown__item"
            tabIndex={0}
            role="option"
            aria-selected={selectedRegion === null}
            onClick={() => handleSelect(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelect(null);
              }
            }}
          >
            {t('i18n.filter.AllRegions')}
          </div>
          {regions.map((region) => (
            <div
              key={region}
              tabIndex={0}
              className="filter-dropdown__item"
              role="option"
              aria-selected={selectedRegion === region}
              onClick={() => handleSelect(region)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelect(region);
                }
              }}
            >
              {getRegionTranslation(region)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
