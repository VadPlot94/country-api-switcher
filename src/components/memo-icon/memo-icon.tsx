import type { SVGProps } from 'react';
import { memo } from 'react';

type IconComponent = React.ComponentType<SVGProps<SVGSVGElement>>;

export const MemoIcon = memo(
  (props: SVGProps<SVGSVGElement> & { component: IconComponent }) => {
    const { component: Icon, ...rest } = props;
    return (
      <Icon
        {...rest}
        tabIndex={-1}
        aria-hidden="true"
      />
    );
  },
);

MemoIcon.displayName = 'MemoIcon';
