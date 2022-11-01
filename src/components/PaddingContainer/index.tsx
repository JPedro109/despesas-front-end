import React from 'react';

type PaddingContainerTypes = {
    children: JSX.Element;
}

export const PaddingContainer = ({ children }: PaddingContainerTypes) => {
    return ( 
        <>
            <main style={{ padding: ".9rem" }}>
                { children }
            </main>
        </>
     );
}