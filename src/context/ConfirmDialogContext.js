import { createContext, useContext, useState } from "react";

const ConfirmDialogContext = createContext();

export const useConfirmDialog = () => {
  return useContext(ConfirmDialogContext);
};

export const ConfirmDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(null);
  const [onCancel, setOnCancel] = useState(null);

  const openConfirmDialog = (message, onConfirm, onCancel) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setOnCancel(() => onCancel);
    setIsOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsOpen(false);
    setMessage("");
    setOnConfirm(null);
    setOnCancel(null);
  };

  const confirmAction = () => {
    if (onConfirm) onConfirm();
    closeConfirmDialog();
  };

  const cancelAction = () => {
    if (onCancel) onCancel();
    closeConfirmDialog();
  };

  return (
    <ConfirmDialogContext.Provider
      value={{ openConfirmDialog, closeConfirmDialog }}
    >
      {children}
      {isOpen && (
        <div className="confirmation-dialog-overlay">
          <div className="confirmation-dialog">
            <p>{message}</p>
            <div className="c-f-btn-contain">
            <button className="confirm-btn" onClick={confirmAction}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={cancelAction}>
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
};
