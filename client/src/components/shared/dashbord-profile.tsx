import { Button, Spinner } from 'flowbite-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from './form-input';
import { Title } from './title';
import { useAuthStore } from '../../store/auth-store';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../services/userApi';
import { ModalPopup } from './popup-modal';
import { useLogoutMutation } from '../../mutations/auth-mutation';
import { useUpdateUserMutation } from '../../mutations/user-mutations';
import { useCloudinaryUpload } from '../../hooks/cloudinary-upload';
import { useTranslation } from 'react-i18next';

export const DashbordProfile = () => {
  const { mutate: logout } = useLogoutMutation();
  const { mutate: updateUser, status } = useUpdateUserMutation();
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { user } = useAuthStore();
  const { t } = useTranslation();

  const { uploadImage, cloudinaryUrl, uploading } = useCloudinaryUpload();

  if (!user) {
    return null;
  }
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { mutate: userDelete } = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      useAuthStore.getState().logout();
    },
  });
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
    await uploadImage(file as File);
  };
  const form = useForm({
    mode: 'onChange',
    // resolver: zodResolver(registerSchema),
    defaultValues: {
      avatarUrl: `${user.avatarUrl}`,
      userName: `${user.userName}`,
      email: `${user.email}`,
      password: ``,
    },
  });
  const { formState } = form;
  const { isDirty } = formState;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userName, email, password } = form.getValues();

    updateUser({
      avatarUrl: cloudinaryUrl || user.avatarUrl,
      userName: userName,
      email: email,
      ...(password && { password }),
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full text-center">
      <Title text={t('titles.profile')} size="xl" />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-[350px] md:w-[450px] justify-center mt-5"
          onSubmit={onSubmit}
        >
          <div className="relative w-40 h-40 self-center">
            <img
              onClick={() => inputFileRef.current?.click()}
              src={imageUrl || user.avatarUrl}
              className="w-full h-full rounded-full object-cover border-8 border-[lightgray] cursor-pointer"
              alt="User avatar"
            />
            {uploading && (
              <div className="absolute top-0 left-0 w-full h-full rounded-full flex items-center justify-center bg-black bg-opacity-50">
                <Spinner size="md" />
              </div>
            )}
          </div>
          <input
            ref={inputFileRef}
            onChange={handleImageChange}
            name="avatarUrl"
            type="file"
            className="hidden"
          />
          <FormInput
            name="userName"
            placeholder={t('placeholders.username')}
            type="text"
            required
          />
          <FormInput
            name="email"
            placeholder={t('placeholders.email')}
            type="email"
            required
          />
          <FormInput
            name="password"
            placeholder={t('placeholders.new_password')}
            type="password"
            required
          />
          <Button
            type="submit"
            disabled={!isDirty && cloudinaryUrl === null}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 hover:opacity-100"
          >
            {status === 'pending' ? (
              <>
                <Spinner size="sm" />
                <span className="ml-4">t('buttons.loading')</span>
              </>
            ) : (
              t('buttons.update')
            )}
          </Button>
          <div className="flex justify-between mt-3">
            <span
              onClick={() => setOpenModal(true)}
              className="text-red-500 cursor-pointer"
            >
              {t('buttons.delete_account')}
            </span>
            <span
              onClick={() => logout()}
              className="text-red-500 cursor-pointer"
            >
              {t('buttons.sign_out')}
            </span>
          </div>
        </form>
      </FormProvider>
      <ModalPopup
        openModal={openModal}
        setOpenModal={setOpenModal}
        text={t('messages.delete_account')}
        onDelete={() => userDelete(user._id as string)}
      />
    </div>
  );
};
