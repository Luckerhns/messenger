import { useEffect, useMemo, useRef, useState } from 'react';

type UseAutoResizeTextareaOptions = {
  maxHeight?: number;
  minHeight?: number;
  debounceDelay?: number;
  value?: string;
};

export const useAutoResizeTextarea = (options: UseAutoResizeTextareaOptions = {}) => {
  const {
    maxHeight = 500,
    minHeight = 45,
    debounceDelay = 100,
    value
  } = options;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [height, setHeight] = useState(`${minHeight}px`);

  const debounce = useMemo(() => {
    return (func: () => void, delay: number) => {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(), delay);
      };
    };
  }, []);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Гарантируем базовую высоту перед измерением,
    // чтобы при очистке контента высота уменьшалась обратно.
    textarea.style.height = `${minHeight}px`;

    const scrollHeight = textarea.scrollHeight;

    const nextHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

    textarea.style.overflowY = nextHeight >= maxHeight ? 'auto' : 'hidden';
    setHeight(`${nextHeight}px`);
  };

  const debouncedAdjustHeight = useMemo(() => {
    return debounce(adjustHeight, debounceDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceDelay, minHeight, maxHeight]);

  // Для controlled textarea: пересчёт именно при изменении value.
  useEffect(() => {
    if (value === undefined) return;
    debouncedAdjustHeight();
  }, [value, debouncedAdjustHeight]);

  // На маунте и при смене minHeight выставляем корректную высоту.
  useEffect(() => {
    adjustHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minHeight, maxHeight]);


  return { textareaRef, height };
};


