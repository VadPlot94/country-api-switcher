import './app.scss';

import Header from '@components/header/header';
import navigationService from '@services/navigation.service';
import urlService from '@services/url.service';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const App = () => {
  const urlParams = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('i18n.app.Title');
  }, []);

  useEffect(() => {
    navigationService.init(navigate);
  }, [navigate]);

  const validateAndCreateNewPathWithLang = useCallback(() => {
    const { success: isLangSupported } = urlService.validateLangParam(
      urlParams.lang,
    );

    const newPath = isLangSupported
      ? null
      : navigationService.removeFirstSegmentFromPath(location);
    return newPath;
  }, [urlParams.lang, location]);

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
