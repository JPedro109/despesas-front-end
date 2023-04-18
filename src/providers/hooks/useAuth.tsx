import { useState, useEffect, ReactElement, useCallback } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

import { notification } from "../../utils/notification";

import { LoadingGif } from "../../components/LoadingGif";

import { api } from "../../services/api";
import { isEmailValid } from "../../utils/validations";
import { isPasswordValid } from "../../utils/validations";
import { cookies } from "../../utils/cookies";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [expirySession, setExpirySession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Login");
  const [formValues, setFormValues] = useState({});
  const router = useRouter();

  const handleLogin = async (e: any) => {

    e.preventDefault();

    const { email, password } = e.target;

    if (!email.value || !password.value) return notification.error("Preencha todos os campos");

    if (!isEmailValid(email.value)) return notification.error("Email/Senha Incorreto(s)");
    
    if (!isPasswordValid(password.value)) return notification.error("Email/Senha Incorreto(s)");

    setButtonChildren(<LoadingGif />);

    await api.client
      .post("/users/login", {
        email: email.value,
        password: password.value,
      })
      .then(({ data }) => {
        setFormValues({});
        setAuthenticated(true);
        setButtonChildren("Login");
        
        api.addTokenInAuthorizationHeader(data);
        cookies.addAuthCookies(data);

        router.push("/home");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor, tente novamente mais tarde")
      );

    setButtonChildren("Login");
  };

  const handleLogout = useCallback(() => {
    api.cleanAuthorizationHeader();
    setAuthenticated(false);
    cookies.removeAuthCookies();
    router.push("/");
  }, [router]);

  useEffect(() => {
    const { token, tokenExpiryTime } = cookies.getAuthCookies();

    if(token) Date.now() < parseInt(tokenExpiryTime) ? setAuthenticated(true) : handleLogout();
  
    setLoading(false);
  }, [handleLogout, setLoading]);

  return { 
    handleLogin, 
    handleLogout, 
    authenticated, 
    loading,
    expirySession, 
    setExpirySession, 
    buttonChildren, 
    formValues, 
    setFormValues 
  };
};