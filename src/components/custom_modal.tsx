/** @format */

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface FullModalProps {
  title: string;
  isOpen: boolean;
  footer?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<FullModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer = false,
}) => {
  const { onClose: chakraOnClose, isOpen: chakraIsOpen } = useDisclosure({
    isOpen,
    onClose,
  });

  return (
    <Modal
      motionPreset='slideInBottom'
      isOpen={chakraIsOpen}
      onClose={chakraOnClose}
      size='xl'
      isCentered>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
        zIndex='2000'
      />
      <ModalContent
        containerProps={{
          zIndex: "2000",
        }}>
        <ModalHeader>&nbsp;</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className='py-4 border-[#00C2C2] border bg-[#F3FCFC] flex items-center px-2'>
            <p className='font-normal text-sm'>{title}</p>
          </div>
          {children}
        </ModalBody>
        {footer ? (
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;