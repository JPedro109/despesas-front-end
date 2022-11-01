import React from 'react';

import { ContainerHeader, IconMenu } from './styles';

import { useMenu } from "../../providers/MenuProvider";

export const Header = () => {

    const { icon } = useMenu(); 
    
    return ( 
        <>
            <ContainerHeader>
                <div>
                    <h1>Despesas</h1>
                </div>
                <IconMenu>
                    {icon}
                </IconMenu>
            </ContainerHeader>
        </>
     );
}