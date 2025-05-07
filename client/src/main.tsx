import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { z } from 'zod';

import './index.css';
import './i18n';
import App from './App.tsx';
import { Providers } from './components/shared/providers.tsx';

import { zodI18nMap } from './schemas/zodErrorMap';
z.setErrorMap(zodI18nMap);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
