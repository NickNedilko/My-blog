import { ZodIssueCode, ZodErrorMap } from 'zod';
import i18n from 'i18next';

export const zodI18nMap: ZodErrorMap = (issue, ctx) => {
  const t = i18n.t;

  switch (issue.code) {
    case ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: t('validation.invalidEmail') };
      }
      if (issue.path.includes('userName')) {
        return { message: t('validation.usernameInvalid') };
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.path.includes('password')) {
        return { message: t('validation.shortPassword') };
      }
      if (issue.path.includes('email')) {
        return { message: t('validation.requiredEmail') };
      }
      if (issue.path.includes('userName')) {
        return { message: t('validation.usernameTooShort') };
      }
      break;
    case ZodIssueCode.too_big:
      if (issue.path.includes('userName')) {
        return { message: t('validation.usernameTooLong') };
      }
      break;
    case ZodIssueCode.custom:
      return { message: t(issue.message as string) };

    default:
      return { message: t('validation.default') };
  }

  return { message: ctx.defaultError };
};
