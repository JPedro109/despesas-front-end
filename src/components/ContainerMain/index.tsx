import React, { ReactElement } from 'react';

import { ContainerMainStyle } from "./styles";

type ContainerMainTypes = {
    children: ReactElement | ReactElement[]
}

export const ContainerMain = ( { children }: ContainerMainTypes ) => {
    return ( 
        <>
            <ContainerMainStyle>
                {children}
            </ContainerMainStyle>
        </>
     );
}