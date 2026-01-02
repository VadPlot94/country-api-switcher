import React, { memo } from 'react';
import './notification-banner.css';
import { MemoIcon } from '../memo-icon/memo-icon';

export interface INotificationBannerProps {
  message: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isError?: boolean;
  buttonName?: string;
}

export default memo(function NotificationBanner(
  props: INotificationBannerProps,
) {
  const handleReloadClick = () => {
    window.location.reload();
  };
  return (
    <div
      className={`notification-banner${props.isError ? ' notification-banner--error' : ''}`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`notification-banner__content${props.isError ? ' notification-banner__content--error' : ''}`}
      >
        <div
          className="notification-banner__icon"
          aria-hidden="true"
        >
          {props.icon ? <MemoIcon component={props.icon} /> : ''}
        </div>
        <div
          id="notification-banner-message"
          className="notification-banner__text"
        >
          {props.message}
        </div>
        {props.buttonName && (
          <button
            type="button"
            aria-describedby="notification-banner-message"
            aria-label="Reload page due to error"
            className="notification-banner__button"
            onClick={handleReloadClick}
            tabIndex={0}
          >
            {props.buttonName}
          </button>
        )}
      </div>
    </div>
  );
});
