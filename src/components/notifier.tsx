/** @format */

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import success from "@/assets/success.svg";
import warning from "@/assets/warning.svg";
import close from "@/assets/close.svg";
import { NotifierPropType } from "@/types";
import { Button } from "./ui/button";

const Notifier: React.FC<NotifierPropType> = ({
  title,
  text,
  status,
  button,
  auth,
  confirmText,
  cancelText,
  isModalOpen,
  closeFunction,
  confirmFunction,
}) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        size={"xl"}
        onClose={() => closeFunction(!isModalOpen)}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
          zIndex='3000'
        />
        <ModalContent
          className='pb-5'
          containerProps={{
            zIndex: "3000",
          }}>
          <ModalHeader>&nbsp;</ModalHeader>
          <ModalCloseButton onClick={() => closeFunction(!isModalOpen)} />
          <ModalBody>
            <>
              {auth ? (
                <div className='flex justify-center items-center bg-none w-full h-screen'>
                  <div className='px-14 py-5 lg:w-[684px] w-full bg-white rounded-[18px]'>
                    <div className='flex justify-end'>
                      <Button
                        variant={"ghost"}
                        onClick={() => closeFunction(!isModalOpen)}>
                        <img src={close} alt='close image' />
                      </Button>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      {status === "success" ? (
                        <img src={success} alt='success icon' />
                      ) : (
                        <img src={warning} alt='warning icon' />
                      )}
                      <p className='mt-5 text-center text-[#333333] text-2xl'>
                        {title}
                      </p>
                      <p className='mt-3 text-center text-[#838A93] text-[16px] lg:w-4/5'>
                        {text}
                      </p>
                    </div>
                    {button ? (
                      <div className='flex justify-center items-center gap-3 w-full py-5'>
                        <button
                          className='bg-white border border-[#3333331F] rounded px-10 py-3'
                          onClick={() => closeFunction(!isModalOpen)}>
                          {cancelText}
                        </button>
                        <button
                          className='bg-[#585BA8] px-10 py-3 text-white rounded'
                          onClick={() => {
                            confirmFunction?.();
                          }}>
                          {confirmText}
                        </button>
                      </div>
                    ) : (
                      <div className='text-center text-[#585BA8] text-sm  w-full'>
                        <NavLink to={"/patient/home"}>
                          Back to Dashboard
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className='flex flex-col items-center justify-center px-14 py-5'>
                    {status === "success" ? (
                      <img src={success} alt='success icon' />
                    ) : (
                      <img src={warning} alt='warning icon' />
                    )}
                    <p className='mt-5 text-center text-[#2B9A23] text-2xl'>
                      {title}
                    </p>
                    <p className='mt-3 text-center text-[#4B4B4B] text-sm'>
                      {text}
                    </p>
                  </div>
                  {button ? (
                    <div className='flex justify-center items-center gap-3'>
                      <button
                        className='bg-white border border-[#3333331F] rounded px-10 py-3'
                        onClick={() => closeFunction(!isModalOpen)}>
                        {cancelText}
                      </button>
                      <button
                        className='bg-[#585BA8] px-10 py-3 text-white rounded'
                        onClick={() => {
                          confirmFunction?.();
                        }}>
                        {confirmText}
                      </button>
                    </div>
                  ) : (
                    <div className='text-center text-[#585BA8] text-sm'>
                      <NavLink to={"/patient/home"}>Back to Dashboard</NavLink>
                    </div>
                  )}
                </>
              )}
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notifier;
