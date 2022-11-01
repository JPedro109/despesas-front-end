import React from 'react';

import PagesContainerStyle from './styles';
import Image from 'next/image';

type PagesContainerTypes = {
    children: JSX.Element;
}

export const PagesContainer = ( { children }: PagesContainerTypes ) => {
    return ( 
        <>
            <PagesContainerStyle>
                <div>
                    { children }
                </div>

                <div>
                    <Image src="/images/banner.svg" alt="Ilustração de uma mão com um saco de dinheiro"  width={500} height={500} />
                </div>
            </PagesContainerStyle>
        </>
     );
}