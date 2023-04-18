import React, { ReactElement, useState } from "react";

import { PublicRoute } from "../components/PublicRoute";
import { PagesContainer } from "../components/PagesContainer/index";
import { FormTitle } from "../components/FormTitle/index";
import { FormInput } from "../components/FormInput/index";
import { FormLink } from "../components/FormLink/index";
import { Button } from "../components/Button/index";
import { LoadingGif } from "../components/LoadingGif/index";

import { Form } from "../styles/form";

import { isEmailValid, isPasswordValid } from "../utils/validations";
import { invalid } from "../utils/messages";
import { api } from "../services/api";
import { notification } from "../utils/notification";

const Register = () => {
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Cadastrar");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const { email, password, passwordConfirm } = e.target;

    if (!email.value || !password.value || !passwordConfirm.value) return notification.error("Preencha todos os campos");

    if (!isEmailValid(email.value)) return notification.error(invalid.email);

    if (!isPasswordValid(password.value)) return notification.error(invalid.password);

    if (password.value !== passwordConfirm.value) return notification.error("As senhas não coincidem");

    setButtonChildren(<LoadingGif />);

    await api.client
      .post("/users", {
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      })
      .then(() => {
        setFormValues({});
        notification.success("Usuário cadastrado com sucesso, verique seu email, não esqueça de verificar sua caixa de spam");
      })
      .catch(({ response }) =>
        response
          ? notification.error(response.data.message)
          : notification.error("Erro no Servidor")
      );

    setButtonChildren("Cadastrar");
  };

  return (
    <>
      <PagesContainer>
        <Form onSubmit={handleRegister}>
          <FormTitle>Cadastro</FormTitle>

          <FormInput 
            type="email" 
            name="email" 
            placeholder="Email" 
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput 
            type="password" 
            name="password"
            placeholder="Senha" 
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <FormInput
            type="password"
            name="passwordConfirm"
            placeholder="Confirmação de Senha"
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <Button type="submit">{buttonChildren}</Button>

          <FormLink link="/">Já tem um cadastro?</FormLink>
        </Form>
      </PagesContainer>
    </>
  );
};

export default PublicRoute(Register);