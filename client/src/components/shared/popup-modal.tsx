import { FC } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Props {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;   
    text: string;
    onDelete?: () => void;
}

export const ModalPopup: FC<Props> =({ openModal, setOpenModal,  text, onDelete }) => {

  return (
    <>
      
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          {text}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => onDelete && onDelete()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
