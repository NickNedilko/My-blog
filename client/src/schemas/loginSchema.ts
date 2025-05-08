import { t } from 'i18next';
import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const loginSchema = z.object({
  email: z.string().min(1).email().regex(emailRegex),
  password: z
    .string()
    .min(8)
    .refine((val) => /[A-Za-z]/.test(val) && /\d/.test(val), {
      message: t('validation.weakPassword'),
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
