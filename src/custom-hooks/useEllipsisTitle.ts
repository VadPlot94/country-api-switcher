import { useRef, useLayoutEffect } from 'react';

interface UseEllipsisTitleProps {
  text: string;
}

export const useEllipsisTitle = ({ text }: UseEllipsisTitleProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !text) {
      return;
    }

    const checkEllipsis = () => {
      const trimmedText = text.trim();

      const isTruncatedByWidth = el.scrollWidth > el.clientWidth;
      const isClampedByHeight = el.scrollHeight > el.clientHeight;

      if ((isTruncatedByWidth || isClampedByHeight) && trimmedText) {
        el.setAttribute('title', trimmedText);
      } else {
        el.removeAttribute('title');
      }
    };

    checkEllipsis();

    const resizeObserver = new ResizeObserver(checkEllipsis);
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  return ref;
};
