import { createContext, useContext, useState } from "react";

const SettingDialog = createContext();
export const SettingDialogProvider = ({ children }) => {
  const [issOpen, setsIsOpen] = useState(false);
  const openSDialog = () => setsIsOpen(true);
  const closeSDialog = () => setsIsOpen(false);

  return (
    <SettingDialog.Provider value={{ issOpen, openSDialog, closeSDialog }}>
      {children}
    </SettingDialog.Provider>
  );
};
export const useSDialog=()=>useContext(SettingDialog);