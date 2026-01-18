import Header from '../header/header';
import './app.scss';
import '../../i18n/i18n-setup';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import i18n from '../../i18n/i18n-setup';
import constants from '../../services/constants.service';
import navigationService from '../../services/navigation.service';

const App = () => {
  const urlParams = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigationService.init(navigate);
  }, [navigate]);

  const validateAndCreateNewPathWithLang = useCallback(() => {
    const isLangSupported = (i18n.options.supportedLngs || []).includes(
      urlParams.lang || constants.DefaultLanguage,
    );
    const newPath = !isLangSupported
      ? '/' +
        location.pathname.split('/').slice(2).filter(Boolean).join('/') +
        location.search
      : null;
    return newPath;
  }, [urlParams.lang, location.pathname, location.search]);

  useEffect(() => {
    const newPath = validateAndCreateNewPathWithLang();
    if (newPath) {
      navigate(newPath, { replace: true });
    }
  }, [
    validateAndCreateNewPathWithLang,
    navigate,
    location.pathname,
    location.search,
  ]);

  return (
    <div
      className="app"
      tabIndex={-1}
      autoFocus
    >
      <Header />
      <div className="app__container">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
