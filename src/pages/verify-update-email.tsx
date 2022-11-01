import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { PrivateRoute } from "../components/PrivateRoute";
import { VerifyEmailTitle } from "../components/VerifyEmailTitle/index";
import { api } from "../services/api";
import { notification } from "../utils/notification";

const VerifyEmailUpdate = () => {
    const router = useRouter();
    const [, query] = router.asPath.split("?");
    const [calledPush, setCalledPush] = useState(true);
  
    useEffect(() => {
      if(calledPush) {
        const handleVerifyEmailUpdate = async () => {
          await api.client
            .patch(`/update-email?${query}`)
            .then(({ data }) => notification.success("E-mail atualizado com sucesso"))
            .catch(({ response }) =>
              response
                ? notification.error(response.data.message)
                : notification.error("Erro no Servidor")
            );
        };
    
        handleVerifyEmailUpdate();
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

export default PrivateRoute(VerifyEmailUpdate);