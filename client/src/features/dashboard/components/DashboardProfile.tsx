import { useTranslation } from 'react-i18next';
import { Title } from '../../../shared/components/Title';
import { UserForm } from '../../user/components/UserForm';
import { useState } from 'react';
import { ModalPopup } from '../../../shared/components/ModalPopup';
import { useAuthStore } from '../../auth/model/auth-store';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../user/api/userApi';

export const DashbordProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: userDelete } = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      useAuthStore.getState().logout();
    },
  });

  const { user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className="max-w-lg p-4 mx-auto  w-full text-center">
      <Title text={t('titles.profile')} size="xl" />
      <UserForm setOpenModal={setOpenModal} />
      <ModalPopup
        openModal={openModal}
        setOpenModal={setOpenModal}
        text={t('messages.delete_account')}
        onDelete={() => userDelete(user?._id as string)}
      />
    </div>
  );
};
