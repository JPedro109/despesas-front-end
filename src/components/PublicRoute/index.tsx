import React from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../providers/AuthProvider';
import { ContainerBigGif } from '../ContainerBigGif';
import { LoadingBigGif } from '../LoadingBigGif';

export const PublicRoute = (Component: any) => {

  const Public = (props: any) => {
    const { loading, authenticated } = useAuth();
    const router = useRouter();
  
    if (loading) {
      return <ContainerBigGif>
        <LoadingBigGif />
      </ContainerBigGif>;
    }
  
    if (authenticated) {
       router.push("/home");
    } else {
      return <Component {...props} />
    }
  }

  return Public;
};