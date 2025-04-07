import React, { useMemo } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme-provider';



export const Providers = ({ children }: React.PropsWithChildren)=> {
  const client = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <ThemeProvider>
          {children}
          </ThemeProvider>
        </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}