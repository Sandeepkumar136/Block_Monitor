import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return (
        <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);