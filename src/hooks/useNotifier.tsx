/** @format */

import { useState, useCallback } from "react";
import Notifier from "@/components/notifier";
import { UseNotifierPropType } from "@/types";

export const useNotifier = () => {
  const [notifierProps, setNotifierProps] =
    useState<UseNotifierPropType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showNotifier = useCallback(
    (props: UseNotifierPropType) => {
      setNotifierProps(props);
      setIsModalOpen(true);
    },
    [setNotifierProps]
  );

  const closeNotifier = (value: boolean) => {
    setIsModalOpen(value);
  };

  const NotifierComponent = notifierProps ? (
    <Notifier
      title={notifierProps.title}
      text={notifierProps.text}
      status={notifierProps.status}
      button={notifierProps?.button}
      confirmText={notifierProps?.confirmText}
      cancelText={notifierProps?.cancelText}
      isModalOpen={isModalOpen}
      confirmFunction={() => {
        notifierProps.confirmFunction?.();
      }}
      closeFunction={closeNotifier}
    />
  ) : null;

  return { showNotifier, NotifierComponent };
};
