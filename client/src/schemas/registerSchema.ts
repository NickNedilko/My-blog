import { t } from 'i18next';
import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const usernameRegex = /^[a-zA-Z0-9._-]+$/;

export const registerSchema = z.object({
  userName: z.string().min(2).max(30).regex(usernameRegex),
  email: z.string().min(1).email().regex(emailRegex),
  password: z
    .string()
    .min(8)
    .refine((val) => /[A-Za-z]/.test(val) && /\d/.test(val), {
      message: t('validation.weakPassword'),
    }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
