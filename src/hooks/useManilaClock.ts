import { useState, useEffect } from 'react';

const TIME_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Manila',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function useManilaClock(): string {
  const [manilaTime, setManilaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setManilaTime(`${TIME_FORMATTER.format(now)} UTC+8`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return manilaTime;
}
