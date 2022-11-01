import React from 'react';

import { ContainerBigGifStyle } from './styles';

type ContainerBigGifTypes = {
    children: JSX.Element;
}

export const ContainerBigGif = ({ children }: ContainerBigGifTypes) => {
    return <ContainerBigGifStyle> { children } </ContainerBigGifStyle>
}