import DeleteButton from "./DeleteButton";
import Button from "./Button";
import { useModal } from "../contexts/ModalContext";

type ModalProps = {};

export default function Modal({}: ModalProps) {
  const { isOpen, hideModal, modalConfig } = useModal();

  if (!isOpen || !modalConfig) return null;

  const {
    title,
    content,
    buttonPrimary,
    buttonSecondary,
    onPrimaryClick,
    onSecondaryClick,
  } = modalConfig;

  return (
    <div
      onClick={hideModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative transition-all duration-300 mt-12"
        style={{ animation: "slideIn 0.3s forwards" }}
      >
        <style>
          {`
        @keyframes slideIn {
          from {
            margin-top: 50px;
          }
          to {
            margin-top: 0;
          }
        }
          `}
        </style>
        <div className="absolute top-2 right-4">
          <DeleteButton onClick={hideModal} />
        </div>

        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {content && <div className="mb-4">{content}</div>}

        <div className="flex justify-end gap-4">
          {buttonPrimary && (
            <Button
              onClick={() => {
                onPrimaryClick?.();
                hideModal();
              }}
            >
              {buttonPrimary}
            </Button>
          )}
          {buttonSecondary && (
            <Button
              onClick={() => {
                onSecondaryClick?.();
                hideModal();
              }}
              buttonType="secondary"
            >
              {buttonSecondary}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
