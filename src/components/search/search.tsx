import DOMPurify from 'dompurify';
import { useAppDispatch, useAppSelector } from '@custom-hooks/hooks';
import {
  setInputValue,
  setSearchQuery,
} from '@redux-settings/slices/search-slice';
import './search.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import type { ICountry } from '@services/providers/types';
import { MemoIcon } from '@components/memo-icon/memo-icon';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

export default function Search() {
  const dispatch = useAppDispatch();
  const searchInputValue = useAppSelector(state => state.search.inputValue);
  const { t } = useTranslation();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isPending, isError } = useQuery<ICountry[]>({
    queryKey: ['countriesList'],
  });

  const debouncedDispatch = useDebouncedCallback((value: string) => {
    const cleanValue = DOMPurify.sanitize(value.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      ALLOW_DATA_ATTR: false,
    });
    dispatch(setSearchQuery(cleanValue));
  }, 300);

  const handleInputChange = (searchValue: string) => {
    dispatch(setInputValue(searchValue));
    debouncedDispatch(searchValue);
  };

  useEffect(() => {
    // Logic for right outline work within tabbing
    let wasMouseClick = false;

    const markMouseDown = () => {
      wasMouseClick = true;
    };

    const onInputFocus = () => {
      if (wasMouseClick) {
        searchRef.current?.classList.remove('search--show-outline');
        wasMouseClick = false;
      } else {
        searchRef.current?.classList.add('search--show-outline');
      }
    };

    const onInputBlur = () => {
      searchRef.current?.classList.remove('search--show-outline');
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('mousedown', markMouseDown);
      input.addEventListener('focus', onInputFocus);
      input.addEventListener('blur', onInputBlur);
    }

    return () => {
      input?.removeEventListener('mousedown', markMouseDown);
      input?.removeEventListener('focus', onInputFocus);
      input?.removeEventListener('blur', onInputBlur);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="search"
      role="searchbox"
    >
      <MemoIcon
        component={MagnifyingGlassIcon}
        className="search__svg"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        name="search"
        autoComplete="off"
        className="search__input"
        placeholder={t('i18n.search.SearchForCountryPlaceholder')}
        disabled={isPending || isError}
        role="search"
        aria-disabled={isPending || isError}
        aria-label={t('i18n.search.SearchForCountryPlaceholder')}
        value={searchInputValue}
        onChange={e => handleInputChange(e.target.value)}
        tabIndex={0}
      ></input>
    </div>
  );
}
