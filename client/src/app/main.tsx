import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { z } from 'zod';

import './index.css';
import '../i18n';
import App from './App.tsx';
import { Providers } from './Providers.tsx';

import { zodI18nMap } from '../features/auth/utils/zodErrorMap.ts';
z.setErrorMap(zodI18nMap);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
