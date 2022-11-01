import React, { createContext, ReactNode, useContext } from 'react';
import { ReactProps } from './types';
import { useMenu as hook} from "./hooks/useMenu";

type Values = {
    positionLeft: number | string,
    icon: JSX.Element,
    closeMenu: () => void; 
}

const MenuContext = createContext({} as Values);

export const MenuProvider = ({ children }: ReactProps) => {
    const { positionLeft, icon, closeMenu } = hook();

    return(
        <MenuContext.Provider value={{ positionLeft, icon, closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenu = () => useContext(MenuContext);