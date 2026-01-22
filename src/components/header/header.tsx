import './header.css';

import { MemoIcon } from '@components/memo-icon/memo-icon';
import { useAppDispatch, useAppSelector } from '@custom-hooks/hooks';
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';
import { toggleAppTheme } from '@redux-settings/slices/app-slice';
import { Theme } from '@services/constants.service';
import helperService from '@services/helper.service';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useAppSelector((state) => state.app.theme);
  helperService.updateHtmlTheme(theme);

  const handleToggleAppTheme = () => {
    dispatch(toggleAppTheme());
  };

  const isDarkMode = theme === Theme.DarkMode;

  return (
    <div
      className="header"
      role="banner"
    >
      <div className="header__container">
        <span className="header__title">{t('i18n.header.WhereInWorld')}</span>
        {/* Accessibility: aria-pressed - will read like: clicked=true or un-clicked=false together with aria-label */}
        <button
          type="button"
          className="header__theme-button"
          aria-label={`Theme Mode Change to ${t(isDarkMode ? 'i18n.header.LightMode' : 'i18n.header.DarkMode')}`}
          aria-pressed={isDarkMode}
          onClick={handleToggleAppTheme}
          tabIndex={0}
        >
          <MemoIcon
            component={isDarkMode ? MoonIcon : SunIcon}
            className="header__theme-icon"
          />
          {/* Accessibility: aria-hidden="true" hide text from screen reader - aria-label above will be used */}
          <span aria-hidden="true">
            {t(isDarkMode ? 'i18n.header.DarkMode' : 'i18n.header.LightMode')}
          </span>
        </button>
      </div>
    </div>
  );
}
