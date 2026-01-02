import { useAppDispatch, useAppSelector } from '../../hooks';
import { Theme } from '../../services/constants.service';
import { toggleAppTheme } from '../../slices/app-slice';
import './header.css';
import { MoonIcon } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';
import { MemoIcon } from '../memo-icon/memo-icon';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useAppSelector(state => state.app.theme);

  const handleToggleAppTheme = () => {
    dispatch(toggleAppTheme());
  };

  return (
    <div className="header">
      <div className="header__container">
        <span className="header__title">{t('i18n.header.WhereInWorld')}</span>
        <button
          type="button"
          className="header__theme-button"
          aria-label="Theme Mode Change"
          onClick={handleToggleAppTheme}
          tabIndex={0}
        >
          {theme === Theme.DarkMode ? (
            <>
              <MemoIcon
                component={MoonIcon}
                className="header__theme-icon"
              />
              <span>{t('i18n.header.DarkMode')}</span>
            </>
          ) : (
            <>
              <MemoIcon
                component={SunIcon}
                className="header__theme-icon"
              />
              <span>{t('i18n.header.LightMode')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
