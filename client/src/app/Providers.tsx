import React, { useMemo } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '../shared/providers/ThemeProvider';
import { useThemeStore } from '../shared/store/theme-store';

export const Providers = ({ children }: React.PropsWithChildren) => {
  const { theme } = useThemeStore();
  const client = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <ThemeProvider>{children}</ThemeProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        theme={theme}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
