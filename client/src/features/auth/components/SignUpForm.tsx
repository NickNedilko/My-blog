import { FormProvider, useForm } from 'react-hook-form';
import phoneImg from '../../../assets/phone-icon.png';

import { Alert, Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import axios from 'axios';
import { HiInformationCircle } from 'react-icons/hi2';
import { registerSchema } from '../model/registerSchema';
import { Logo } from '../../../shared/components/Logo';
import { FormInput } from '../../../shared/components/FormInput';
import { OAuth } from './OAuth';
import { useSignUpMutation } from '../api/mutations/auth-mutation';

export const SignUpForm = () => {
  const { mutate: signup, status, error } = useSignUpMutation();
  const { t } = useTranslation();

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    signup(form.getValues());
  };

  useEffect(() => {
    const serverMessage =
      axios.isAxiosError(error) && error?.response?.data?.message;
    if (serverMessage === 'validation.emailExists') {
      form.setError('email', {
        message: t('validation.emailExists'),
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex flex-col gap-5 p-3 items-center max-w-3xl w-[350px] mx-auto md:flex-row ">
        <div>
          <FormProvider {...form}>
            <form
              className="flex flex-col gap-3 w-[350px] md:w-[450px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col justify-between items-center">
                <Logo className="text-4xl" />
                <div className="flex gap-2 items-center justify-center">
                  <p className="text-sm mt-5 text-center">
                    {t('messages.sign_in_up')}
                  </p>
                  <img src={phoneImg} alt="phone-icon" width={60} height={60} />
                </div>
              </div>
              <FormInput
                name="userName"
                label={t('forms.username')}
                placeholder={t('placeholders.username')}
                type="text"
                required
              />
              <FormInput
                name="email"
                label={t('forms.email')}
                placeholder={t('placeholders.email')}
                type="email"
                required
              />
              <FormInput
                name="password"
                label={t('forms.password')}
                placeholder={t('placeholders.password')}
                type="password"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 hover:opacity-100"
              >
                {status === 'pending' ? (
                  <>
                    <Spinner size="sm" />
                    <span className="ml-4">{t('buttons.loading')}</span>
                  </>
                ) : (
                  t('buttons.sign_up')
                )}
              </Button>
              <OAuth />
              <div className="flex gap-2 items-center justify-center">
                <span>{t('messages.already_have_account')}</span>
                <Link to="/sign-in" className="text-blue-500">
                  {t('navigation.sign_in')}
                </Link>
              </div>
            </form>
          </FormProvider>
          {axios.isAxiosError(error) && error?.response?.data.message && (
            <Alert color="failure" icon={HiInformationCircle}>
              {error?.response.data.message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
