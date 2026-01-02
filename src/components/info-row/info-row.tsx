import { memo } from 'react';
import Loader from '../loader/loader';
import './info-row.css';
import { useEllipsisTitle } from '../../custom-hooks/useEllipsisTitle';

export interface IInfoRowProps {
  title: string;
  value: string;
  isFetching?: boolean;
}

export default memo(function InfoRow({
  title = '',
  value = '',
  isFetching,
}: IInfoRowProps) {
  const longTextRef = useEllipsisTitle({ text: value });

  const isShowLoader = isFetching && !value;
  return (
    <div className="info-row">
      <span className="info-row__title">{title}: </span>
      {!isShowLoader ? (
        <span
          ref={longTextRef}
          className="info-row__title-value"
        >
          {value || '-'}
        </span>
      ) : (
        <div className="info-row__loader-container">
          <Loader size={4} />
        </div>
      )}
    </div>
  );
});
