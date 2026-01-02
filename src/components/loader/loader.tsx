import { memo } from 'react';
import './loader.css';

export interface ILoaderProps {
  size?: number;
}

export default memo(function Loader({ size = 12 }: ILoaderProps) {
  return (
    <div
      className="loader-dots"
      style={{ '--loader-size': `${size}px` } as React.CSSProperties}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
});
