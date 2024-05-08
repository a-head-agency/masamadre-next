"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { mergeProps, useModalOverlay } from "react-aria";
import {
  Dialog,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
} from "react-aria-components";

export function useMessageModal(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const showMessage = useCallback(
    (message: string) => {
      setMessage(message);
      setIsOpen(true);
    },
    [setIsOpen, setMessage]
  );

  const closeMessage = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    showMessage,
    closeMessage,
    props: mergeProps(
      props,
      {
        isOpen,
        onOpenChange: setIsOpen,
      } satisfies ModalOverlayProps,
      {
        message,
      }
    ),
  };
}

interface Props extends Omit<ModalOverlayProps, "className" | "style"> {
  message?: ReactNode;
}

export default function MessageModal({ message, ...props }: Props) {
  return (
    <ModalOverlay
      className="fixed inset-0 overflow-y-auto flex justify-center items-center p-4"
      {...props}
    >
      <Modal className="p-4 bg-white border border-black" {...props}>
        <Dialog className="outline-none">
          <p className="text-xl">{message}</p>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
