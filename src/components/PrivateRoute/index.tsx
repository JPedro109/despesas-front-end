import React from 'react';
import { useRouter } from 'next/router';

import { ContainerBigGif } from "../ContainerBigGif"
import { LoadingBigGif } from "../LoadingBigGif"

import { useAuth } from "../../providers/AuthProvider";

export const PrivateRoute = (Component: any) => {

  const Private = (props: any) => {
    const { loading, authenticated } = useAuth();
    const router = useRouter();

    if (loading) {
      return (
        <ContainerBigGif>
        <LoadingBigGif />
      </ContainerBigGif>
      );
    }
  
    if (!authenticated) router.push("/");

    return <Component {...props} />
  } 

  return Private;
};