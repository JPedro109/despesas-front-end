import React, { createContext, useContext, ReactElement } from "react";
import { ReactProps } from './types';
import { useAuth as hook } from "./hooks/useAuth";

type Values = {
  handleLogin: (e: any) => void,
  handleLogout: () => void,
  authenticated: boolean,
  loading: boolean,
  expirySession: boolean,
  setExpirySession: (value: boolean) => void,
  buttonChildren: string | ReactElement,
  formValues: {},
  setFormValues: (value: { email: string, password: string }) => void
}

const AuthContext = createContext<Values>({} as Values);

export const AuthProvider = ({ children }: ReactProps) => {

  const {
    handleLogin, 
    handleLogout, 
    authenticated, 
    loading,
    expirySession, 
    setExpirySession, 
    buttonChildren, 
    formValues, 
    setFormValues
  } = hook();

  return (
    <AuthContext.Provider
      value={{
        handleLogin, 
        handleLogout, 
        authenticated, 
        loading,
        expirySession, 
        setExpirySession, 
        buttonChildren, 
        formValues, 
        setFormValues
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);