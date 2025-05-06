import { Button, Spinner } from 'flowbite-react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { app } from '../../firebase';
import { useMutation } from '@tanstack/react-query';
import { signWithGoogle } from '../../services/authApi';
import { useAuthStore } from '../../store/auth-store';
import { useTranslation } from 'react-i18next';

export const OAuth = () => {
  const { t } = useTranslation();

  const { mutate, status } = useMutation({
    mutationFn: signWithGoogle,
    onSuccess: async (data) => {
      const { ...user } = data;
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setLoggedIn();
    },
  });

  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    try {
      const resFromGoogle = await signInWithPopup(auth, provider);
      if (!resFromGoogle.user.email || !resFromGoogle.user.displayName) {
        return;
      }
      mutate({
        email: resFromGoogle.user.email,
        userName: resFromGoogle.user.displayName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      outline
      className="bg-gradient-to-r from-pink-500 to-orange-500"
    >
      <AiFillGoogleCircle className="h-6 w-6 mr-2" />
      {status === 'pending' ? (
        <>
          <Spinner size="sm" />
          <span className="ml-4">{t('buttons.loading')}</span>
        </>
      ) : (
        t('buttons.sign_in_with_google')
      )}
    </Button>
  );
};
