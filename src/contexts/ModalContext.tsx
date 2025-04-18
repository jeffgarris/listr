import { createContext, useContext, useState, ReactNode } from "react";

export type ModalConfig = {
  title?: string;
  content?: string;
  buttonPrimary?: string;
  buttonSecondary?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

type ModalContextType = {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
  modalConfig: ModalConfig | null;
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (config: ModalConfig) => {
    setModalConfig(config);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalConfig(null);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, modalConfig, isOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
