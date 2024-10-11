/** @format */

import { FullModalPropType } from "@/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const FullModal: React.FC<FullModalPropType> = ({
  children,
  label,
  icon = null,
  cn = "",
  title = null,
  btnTitle = "",
  footer = false,
  overlayClose = true,
  scrollBehavior = 'outside',
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen} className={cn}>
        {label ? label : icon} {btnTitle}
      </button>

      <Modal
        isOpen={isOpen}
        size={"xl"}
        onClose={onClose}
        motionPreset='slideInBottom'
        closeOnOverlayClick={overlayClose}
        scrollBehavior={scrollBehavior as "inside" | "outside"}
        isCentered>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
          zIndex='2000'
        />
        <ModalContent
          className='pb-5'
          containerProps={{
            zIndex: "2000",
          }}>
          <ModalHeader>&nbsp;</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {title && (
              <div className='py-4 border-[#00C2C2] border bg-[#F3FCFC] flex items-center px-2'>
                <p className='font-normal text-sm'>{title}</p>
              </div>
            )}
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
    </>
  );
};

export default FullModal;
