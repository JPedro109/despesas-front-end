import React, { ReactElement } from 'react';
import Link from 'next/link';

import { FormLinkStyle } from './styles';

type FormLinkTypes = {
    link: string,
    children: string
}

export const FormLink = ( { link, children }: FormLinkTypes ) => {

    return ( 
        <>
            <div>
                <FormLinkStyle>
                    <Link href={link} passHref>
                        { children }
                    </Link>
                </FormLinkStyle>
            </div>
        </>
     );
}