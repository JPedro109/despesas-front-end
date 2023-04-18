import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { PublicRoute } from "../components/PublicRoute";
import { VerifyEmailTitle } from "../components/VerifyEmailTitle/index";

import { api } from "../services/api";
import { notification } from "../utils/notification";

const VerifyEmail = () => {
  const router = useRouter();
  const [, query] = router.asPath.split("?");
  const [calledPush, setCalledPush] = useState(true);

  useEffect(() => {
    if(calledPush) {
      const handleVerifyEmail = async () => {
        await api.client
          .patch(`/users/verify-email?${query}`)
          .then(() => notification.success("E-mail verificado com sucesso"))
          .catch(({ response }) =>
            response
              ? notification.error(response.data.message)
              : notification.error("Erro no Servidor")
          );
      };
      handleVerifyEmail();
      setCalledPush(false);
      router.push("/");
    }
  }, [query, router, calledPush]);

    return ( 
        <>
            <VerifyEmailTitle />
        </>
     );
}
 
export default PublicRoute(VerifyEmail);