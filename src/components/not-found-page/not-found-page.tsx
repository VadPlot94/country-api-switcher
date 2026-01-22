import { useTranslation } from 'react-i18next';
import NotificationBanner from '@components/notification-banner/notification-banner';
import './not-found-page.scss';
import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="not-found-page">
      <NotificationBanner
        message={t('i18n.notFoundPage.404NotFound')}
        icon={GlobeEuropeAfricaIcon}
      />
    </div>
  );
}
