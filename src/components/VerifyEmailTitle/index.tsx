import React from 'react';

import { PaddingContainer } from "../PaddingContainer";
import { LoadingBigGif } from "../LoadingBigGif";

import VerifyEmailTitleContainer from './style';

export const VerifyEmailTitle = () => {
    return ( 
        <>
            <PaddingContainer>
                <VerifyEmailTitleContainer>
                    <div>
                        <h1>Verificando Email</h1>
                    </div>
                    <LoadingBigGif />
                </VerifyEmailTitleContainer>
            </PaddingContainer>
        </>
     );
}