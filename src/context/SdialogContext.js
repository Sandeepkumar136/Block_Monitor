import { createContext, useContext, useState } from "react";

const SdialogContext=createContext();


export const SdialogProvider= ({children})=>{
    const [isSettingOpen, setIsSettingOpen]=useState(false);
    const openSetting = ()=>setIsSettingOpen(true);
    const closeSetting = ()=>setIsSettingOpen(false);


    return(
        <SdialogContext.Provider value={{openSetting, closeSetting, isSettingOpen}}>
            {children}
        </SdialogContext.Provider>
    );
};
export const useSetting = () =>useContext(SdialogContext);