import React, { useState } from 'react';

import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";

export const useMenu = () => {
    const [positionLeft, setPositionLeft] = useState<number | string>(`${-1000}px`);
    const [icon, setIcon] = useState(<AiOutlineMenu onClick={() => showMenu()} />)
    const showMenu = () => {
        setIcon(<AiOutlineCloseCircle onClick={() => {
            setIcon(<AiOutlineMenu onClick={() => showMenu()} />);
            setPositionLeft(`${-1000}px`);
        }} />);
        setPositionLeft(0);
    };

    const closeMenu = () => {
        setIcon(<AiOutlineMenu onClick={() => showMenu()} />);
        setPositionLeft(`${-1000}px`);
    }

    return { positionLeft, icon, closeMenu }
}