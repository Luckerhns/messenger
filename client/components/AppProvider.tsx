import { useEffect } from 'react';
import { resetAllStores } from '../store';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Optional: Initialize or reset on mount
    // resetAllStores();
  }, []);

  return <>{children}</>;
};

