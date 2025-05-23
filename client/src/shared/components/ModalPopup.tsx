import { FC } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

interface Props {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  text: string;
  onDelete?: () => void;
  onDeleteComment?: (id: string) => void;
}

export const ModalPopup: FC<Props> = ({
  openModal,
  setOpenModal,
  text,
  onDelete,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {text}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => onDelete && onDelete()}>
                {t('common.yes')}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                {t('common.no')}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
